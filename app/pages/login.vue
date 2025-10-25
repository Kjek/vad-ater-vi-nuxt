<template>
  <UContainer class="min-h-[inherit] w-fit content-center">
    <UPageCard>
      <FormLogin @sign-in="onLogin" />
    </UPageCard>
  </UContainer>
  <UModal v-model:open="open" title="Create Admin Account">
    <UButton
      label="Create Admin Account"
      color="neutral"
      variant="outline"
      class="absolute right-0 bottom-0 mr-4 mb-4"
    ></UButton>
    <template #body>
      <UContainer class="w-fit">
        <FormSignup @sign-up="onSignUp"></FormSignup>
      </UContainer>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { CreateAccount } from '~~/server/types/account';

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

const onSignUp = async (creds: CreateAccount) => {
  const { status, error } = await useFetch('/api/auth/signup', {
    method: 'POST',
    body: creds,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  useRequestStatusToast(status, error, 'The account has been created.');
  if (status.value === 'success') {
    open.value = false;
  }
};
</script>
