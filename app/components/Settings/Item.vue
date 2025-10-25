<template>
  <SettingsItemContent>
    <template #left>
      <UBadge :color="enabled ? 'primary' : 'error'"></UBadge>
      <BaseText as="h3">{{ name }}</BaseText>
    </template>
    <template #right>
      <RestaurantEditModal :restaurant-id="restaurantId" />
      <RestaurantDebugModal :restaurant-id="restaurantId" />
      <UButton
        label="Re-scrape"
        color="neutral"
        variant="outline"
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
import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';

interface Props {
  restaurantId: string;
  name: string;
  enabled?: boolean;
}

interface Emits {
  (e: 'scrape', restaurantId: string): void;
  (e: 'activate', restaurantId: string, updateConfig: UpdateRestaurantConfig): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
