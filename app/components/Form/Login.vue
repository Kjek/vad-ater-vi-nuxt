<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit.prevent="onSubmit">
    <UFormField label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton label="Login" type="submit" color="neutral" variant="outline" />
  </UForm>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
interface LocalState {
  username?: string;
  password?: string;
}

interface Emits {
  (e: 'signIn', username: string, password: string): void;
}

const emit = defineEmits<Emits>();

const state = reactive<LocalState>({
  username: undefined,
  password: undefined,
});

const validate = (state: LocalState): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ name: 'username', message: 'Required' });
  if (!state.password) errors.push({ name: 'password', message: 'Required' });
  return errors;
};

const onSubmit = () => {
  if (state.username && state.password) {
    emit('signIn', state.username, state.password);
  }
};
</script>
