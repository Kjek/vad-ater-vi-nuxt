<template>
  <SettingsItemContent>
    <template
      v-if="title"
      #left
    >
      <BaseText
        v-if="title"
        as="h3"
        class="grow"
      >
        {{ title }}
      </BaseText>
    </template>
    <template #right>
      <UButton
        v-if="label"
        :label="label"
        color="neutral"
        variant="outline"
        :loading="isLoading"
        :disabled="isLoading"
        @click="onClick"
      />
    </template>
  </SettingsItemContent>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';

interface Props {
  title?: string;
  label?: string;
  status?: AsyncDataRequestStatus;
}

interface Emits {
  (e: 'click'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const onClick = () => {
  emit('click');
};

const isLoading = computed(() => props.status === 'pending');
</script>
