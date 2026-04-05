import { NuxtAuthHandler } from '#auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { WebAuthnLoginVerifyResponse } from '~~/server/types/auth';
import { prisma } from '~~/server/utils/prisma';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', required: true },
        password: { label: 'Password', type: 'password' },
        webauthn: { label: 'WebAuthn', type: 'text' },
      },
      async authorize(
        credentials: Record<'webauthn' | 'password' | 'username', string> | undefined
      ) {
        if (credentials?.password) {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordMatched = await bcrypt.compare(
            credentials?.password ?? '',
            user.password
          );

          if (!isPasswordMatched) {
            return null;
          }

          return user;
        } else if (credentials?.webauthn) {
          try {
            const result = await $fetch<WebAuthnLoginVerifyResponse>(
              '/api/webauthn/authenticate/verify',
              {
                method: 'POST',
                body: credentials.webauthn,
              }
            );
            console.log('result', result);

            if (result.verified) {
              return await prisma.user.findUnique({
                where: { id: result.userId },
              });
            }
          } catch (err) {
            console.error(err);
            throw createError({ statusCode: 400, statusMessage: 'Unauthorized' });
          }

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          username: token.username as string,
        };
      }
      return session;
    },
  },
});
