<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit.prevent="onSubmit"
  >
    <UFormField
      label="Username"
      name="username"
    >
      <UInput v-model="state.username" />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
      />
    </UFormField>

    <UFormField
      label="Secret"
      name="secret"
    >
      <UInput
        v-model="state.secret"
        type="password"
      />
    </UFormField>

    <UButton
      label="Create"
      type="submit"
      color="neutral"
      variant="outline"
    />
  </UForm>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';
import type { CreateAccount } from '~~/server/types/account';

interface Emits {
  (e: 'signUp', creds: CreateAccount): void;
}

const emit = defineEmits<Emits>();

const state = reactive<Partial<CreateAccount>>({
  username: undefined,
  password: undefined,
  secret: undefined,
});

const validate = (state: CreateAccount): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ name: 'username', message: 'Required' });
  if (!state.password) errors.push({ name: 'password', message: 'Required' });
  if (!state.secret) errors.push({ name: 'secret', message: 'Required' });
  return errors;
};

const onSubmit = async () => {
  if (state.username && state.password && state.secret) {
    emit('signUp', state as CreateAccount);
  }
};
</script>
