import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
  }
}

export type WebAuthnLoginVerifyResponse = { verified: true; userId: string } | { verified: false };
