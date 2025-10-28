<template>
  <SettingsItemContent>
    <template #left>
      <UBadge :color="enabled ? 'primary' : 'error'" />
      <BaseText as="h3">
        {{ name }}
      </BaseText>
    </template>
    <template #right>
      <RestaurantEditModal :restaurant-id="restaurantId" />
      <RestaurantDebugModal :restaurant-id="restaurantId" />
      <UButton
        label="Re-scrape"
        color="neutral"
        variant="outline"
        :loading="isLoading"
        :disabled="isLoading"
        @click="emit('scrape', restaurantId)"
      />
      <UButton
        :label="enabled ? 'Disable' : 'Enable'"
        color="error"
        variant="outline"
        active-color="primary"
        :active="!enabled"
        @click="emit('activate', restaurantId, { enabled: !enabled })"
      />
    </template>
  </SettingsItemContent>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';

interface Props {
  restaurantId: string;
  name: string;
  enabled?: boolean;
  status?: AsyncDataRequestStatus;
}

interface Emits {
  (e: 'scrape', restaurantId: string): void;
  (e: 'activate', restaurantId: string, updateConfig: UpdateRestaurantConfig): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const isLoading = computed(() => props.status === 'pending');
</script>
