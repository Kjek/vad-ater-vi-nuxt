import {
  startRegistration,
  type PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/browser';
import type { CreateAccountPasskey } from '~~/server/types/account';

export const usePKRegister = async (credentials?: CreateAccountPasskey) => {
  const { data: registerOptions, status: registerStatus } =
    await useToastFetch<PublicKeyCredentialCreationOptionsJSON>('/api/webauthn/register/options', {
      method: 'POST',
      body: credentials,
    });

  if (registerStatus.value !== 'success' || !registerOptions.value) {
    throw new Error('Passkey registration for options failed');
  }

  const attResp = await startRegistration({ optionsJSON: registerOptions.value });

  const { data: registerVerification } = await useToastFetch<{ verified: boolean }>(
    '/api/webauthn/register/verify',
    {
      method: 'POST',
      body: attResp,
    }
  );

  if (!registerVerification.value?.verified) {
    throw new Error('Passkey verification failed');
  }
};
