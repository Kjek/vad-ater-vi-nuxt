<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <UButton
        :color="usePasskey ? 'neutral' : 'primary'"
        variant="solid"
        @click="usePasskey = false"
      >
        Password
      </UButton>
      <UButton
        :color="usePasskey ? 'primary' : 'neutral'"
        variant="solid"
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

      <UButton
        :label="usePasskey ? 'Login with Passkey' : 'Login'"
        type="submit"
        :icon="usePasskey ? 'i-lucide-fingerprint-pattern' : undefined"
      />
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';

interface LocalState {
  username?: string;
  password?: string;
}

interface Emits {
  (e: 'signIn', username: string, password: string): void;
  (e: 'signInPasskey', username: string): void;
}

const emit = defineEmits<Emits>();

const state = reactive<LocalState>({
  username: undefined,
  password: undefined,
});

const usePasskey = ref(false);

const validate = (state: LocalState): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ name: 'username', message: 'Required' });
  if (!state.password && !usePasskey.value) errors.push({ name: 'password', message: 'Required' });
  return errors;
};

const onSubmit = () => {
  if (usePasskey.value && state.username) {
    emit('signInPasskey', state.username);
  } else {
    if (state.username && state.password) {
      emit('signIn', state.username, state.password);
    }
  }
};

watch(usePasskey, async (val) => {
  if (val && state.username) {
    onSubmit();
  }
});
</script>
