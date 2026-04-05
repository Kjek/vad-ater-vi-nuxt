import {
  startAuthentication,
  type PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/browser';

export const usePKAuthenticate = async (username: string) => {
  const { signIn } = useAuth();

  const { data: authenticateOptions, status: authStatus } =
    await useToastFetch<PublicKeyCredentialRequestOptionsJSON>(
      '/api/webauthn/authenticate/options',
      {
        method: 'POST',
        body: JSON.stringify({ username: username }),
      }
    );

  if (authStatus.value !== 'success' || !authenticateOptions.value) return;

  const asseResp = await startAuthentication({ optionsJSON: authenticateOptions.value });

  const login = await signIn('credentials', {
    callbackUrl: '/admin',
    username: username,
    webauthn: JSON.stringify({
      expectedChallenge: authenticateOptions.value?.challenge,
      authResponse: asseResp,
    }),
  });

  if (login?.error) {
    throw new Error('Login failed after signup');
  }
};
