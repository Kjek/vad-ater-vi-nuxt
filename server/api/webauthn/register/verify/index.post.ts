import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { prisma } from '~~/server/utils/prisma';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  const expectedChallenge = getCookie(event, 'webauthn_challenge');

  if (!expectedChallenge) {
    throw createError({ statusCode: 400, statusMessage: 'Passkey challenge failed' });
  }

  const verification = await verifyRegistrationResponse({
    response: body,
    expectedChallenge,
    expectedOrigin: process.env.RP_ORIGIN ?? 'http://localhost:3000',
    expectedRPID: process.env.RPID ?? 'localhost',
  });

  if (!verification.verified) return { verified: false };

  const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;

  let createdUserID;

  // Create user if not exists
  if (!session?.user) {
    const username = getCookie(event, 'webauthn_username');
    if (!username) throw createError({ statusCode: 400, statusMessage: 'Username not found' });
    const user = await prisma.user.create({
      data: { username: username, password: '' },
    });
    createdUserID = user.id;
  }

  await prisma.passkey.create({
    data: {
      id: credential.id,
      publicKey: Buffer.from(credential.publicKey),
      counter: credential.counter,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      transports: credential.transports,
      user: {
        connect: { id: session?.user.id ?? getCookie(event, 'webauthn_user_id') ?? createdUserID },
      },
    },
  });

  deleteCookie(event, 'webauthn_challenge');
  deleteCookie(event, 'webauthn_user_id');
  deleteCookie(event, 'webauthn_username');

  return { verified: true };
});
