<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <UButton
        :color="usePasskey ? 'neutral' : 'primary'"
        @click="usePasskey = false"
      >
        Password
      </UButton>
      <UButton
        :color="usePasskey ? 'primary' : 'neutral'"
        @click="usePasskey = true"
      >
        Passkey
      </UButton>
    </div>

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
        v-if="!usePasskey"
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
        :label="usePasskey ? 'Create with Passkey' : 'Create'"
        type="submit"
        :icon="usePasskey ? 'i-lucide-fingerprint-pattern' : undefined"
      />
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';
import type { CreateAccount, CreateAccountPasskey } from '~~/server/types/account';

interface Emits {
  (e: 'signUp', creds: CreateAccount): void;
  (e: 'signUpPasskey', creds: CreateAccountPasskey): void;
}

const emit = defineEmits<Emits>();

const state = reactive<Partial<CreateAccount>>({
  username: undefined,
  password: undefined,
  secret: undefined,
});

const usePasskey = ref(false);

const validate = (state: CreateAccount): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ name: 'username', message: 'Required' });
  if (!state.password && !usePasskey.value) errors.push({ name: 'password', message: 'Required' });
  if (!state.secret) errors.push({ name: 'secret', message: 'Required' });
  return errors;
};

const onSubmit = async () => {
  if (usePasskey.value && state.username && state.secret) {
    emit('signUpPasskey', {
      username: state.username,
      secret: state.secret,
    });
  } else {
    if (state.username && state.password && state.secret) {
      emit('signUp', state as CreateAccount);
    }
  }
};
</script>
