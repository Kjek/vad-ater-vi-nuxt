import {
  generateRegistrationOptions,
  type AuthenticatorTransportFuture,
} from '@simplewebauthn/server';
import { prisma } from '~~/server/utils/prisma';
import { getServerSession } from '#auth';
import { setCookieIfValue } from '~~/server/helpers/cookie-helper';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  if (!session?.user) {
    if (!process.env.ADMIN_SECRET || !body || process.env.ADMIN_SECRET !== body.secret) {
      throw createError({ statusCode: 400 });
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id ?? '' },
    include: { passkeys: true },
  });

  const options = await generateRegistrationOptions({
    rpName: process.env.RP_NAME ?? '',
    rpID: process.env.RPID ?? 'localhost',
    userName: user?.username ?? body.username,
    userDisplayName: user?.username ?? body.username,
    attestationType: 'none',
    excludeCredentials: user?.passkeys.map((pk) => ({
      id: pk.id,
      transports: pk.transports as unknown as AuthenticatorTransportFuture[],
    })),
    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform', // YubiKey
      userVerification: 'preferred',
    },
  });

  setCookieIfValue(event, 'webauthn_challenge', options.challenge, { httpOnly: true });
  // setCookieIfValue(event, 'webauthn_user_id', user?.id ?? undefined, { httpOnly: true });
  setCookieIfValue(event, 'webauthn_username', user?.username ?? body.username, { httpOnly: true });

  return options;
});
