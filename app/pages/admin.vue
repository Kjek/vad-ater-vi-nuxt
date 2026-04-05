<template>
  <UContainer class="mt-4 mb-4">
    <UPageList
      class="gap-4"
      as="ul"
    >
      <template v-if="restaurantConfigs.length > 0">
        <UPageCard
          v-for="config in restaurantConfigs"
          :key="config.restaurantId"
          class="bg-neutral-50 dark:bg-neutral-950"
          as="li"
        >
          <SettingsItem
            :restaurant-id="config.restaurantId"
            :name="config.name"
            :enabled="config.enabled"
            :status="requestsStatuses[`scrape-${config.restaurantId}`]"
            @scrape="onScrapeSingle"
            @activate="onActivateRestaurant"
          />
        </UPageCard>
      </template>
      <template v-else>
        <UPageCard as="li">
          <BaseText>List is empty</BaseText>
        </UPageCard>
      </template>
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRequestStatusMap } from '~/composables/use-request-status-map';
import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const restaurantConfigsStore = useRestaurantConfigsStore();
const { restaurantConfigs } = storeToRefs(restaurantConfigsStore);
const { updateRestaurantConfig } = restaurantConfigsStore;

const { map: requestsStatuses, setStatus } = useRequestStatusMap();

const onScrapeSingle = async (restaurantId: string) => {
  setStatus(`scrape-${restaurantId}`, 'pending');
  const { status } = await useToastFetch(`/api/scrapers/${restaurantId}`);
  setStatus(`scrape-${restaurantId}`, status.value);
};

const onActivateRestaurant = async (restaurantId: string, updateConfig: UpdateRestaurantConfig) => {
  await updateRestaurantConfig(restaurantId, updateConfig);
};
</script>

<style></style>
