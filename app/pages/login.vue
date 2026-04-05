<template>
  <UContainer class="min-h-[inherit] w-fit content-center">
    <UPageCard>
      <FormLogin
        @sign-in="onLogin"
        @sign-in-passkey="onLoginPasskey"
      />
    </UPageCard>
  </UContainer>
  <UModal
    v-model:open="open"
    title="Create Admin Account"
  >
    <UButton
      label="Create Admin Account"
      color="neutral"
      variant="outline"
      class="absolute right-0 bottom-0 mr-4 mb-4"
    ></UButton>
    <template #body>
      <UContainer class="w-fit">
        <FormSignup
          @sign-up="onSignUp"
          @sign-up-passkey="onSignUpPasskey"
        ></FormSignup>
      </UContainer>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import { usePKAuthenticate } from '~/composables/use-pk-authenticate';
import { usePKRegister } from '~/composables/use-pk-register';
import type { CreateAccount, CreateAccountPasskey } from '~~/server/types/account';

const open = ref<boolean>(false);

defineShortcuts({
  o: () => (open.value = !open.value),
});

const toast = useToast();

const { signIn } = useAuth();
const onLogin = async (username: string, password: string) => {
  const res = await signIn('credentials', {
    redirect: false,
    username: username,
    password: password,
  });

  if (res?.error) {
    toast.add({ title: 'Error', description: res.error, color: 'error' });
  } else {
    navigateTo('/admin');
  }
};

const onLoginPasskey = async (username: string) => {
  await usePKAuthenticate(username);

  navigateTo('/admin');
};

const onSignUp = async (creds: CreateAccount) => {
  const { status } = await useToastFetch('/api/auth/signup', {
    method: 'POST',
    body: creds,
  });
  if (status.value === 'success') {
    open.value = false;
  }
};

const onSignUpPasskey = async (creds: CreateAccountPasskey) => {
  try {
    await usePKRegister(creds);
    await usePKAuthenticate(creds.username);

    open.value = false;
    navigateTo('/admin');
  } catch (err) {
    console.error(err);
  }
};
</script>
