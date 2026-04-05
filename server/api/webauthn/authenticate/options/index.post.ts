import {
  generateAuthenticationOptions,
  type AuthenticatorTransportFuture,
} from '@simplewebauthn/server';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { username } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { username },
    include: { passkeys: true },
  });

  if (!user) throw createError({ statusCode: 404 });

  const options = await generateAuthenticationOptions({
    rpID: process.env.RPID ?? 'localhost',
    allowCredentials: user.passkeys.map((pk) => ({
      id: pk.id,
      transports: pk.transports as unknown as AuthenticatorTransportFuture[],
    })),
    userVerification: 'preferred',
  });

  return options;
});
