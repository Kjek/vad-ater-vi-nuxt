import {
  verifyAuthenticationResponse,
  type AuthenticationResponseJSON,
} from '@simplewebauthn/server';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { expectedChallenge, authResponse } = (await readBody(event)) as {
    expectedChallenge: string;
    authResponse: AuthenticationResponseJSON;
  };

  if (!expectedChallenge) {
    throw createError({ statusCode: 400, statusMessage: 'Passkey challenge failed' });
  }

  const passkey = await prisma.passkey.findUnique({
    where: { id: authResponse.id },
  });

  if (!passkey) throw createError({ statusCode: 404, message: 'Passkey not found' });

  const verification = await verifyAuthenticationResponse({
    response: authResponse,
    expectedChallenge,
    expectedOrigin: process.env.RP_ORIGIN ?? 'http://localhost:3000',
    expectedRPID: process.env.RPID ?? 'localhost',
    credential: {
      id: passkey.id,
      publicKey: passkey.publicKey,
      counter: passkey.counter,
    },
  });

  if (!verification.verified) return { verified: false };

  await prisma.passkey.update({
    where: { id: passkey.id },
    data: { counter: verification.authenticationInfo.newCounter },
  });

  return {
    verified: true,
    userId: passkey.userId,
  };
});
