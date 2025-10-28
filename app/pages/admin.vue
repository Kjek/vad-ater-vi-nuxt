<template>
  <UContainer class="mt-4 mb-4">
    <UPageList
      class="gap-4"
      as="ul"
    >
      <UPageCard
        key="all"
        class="bg-neutral-50 dark:bg-neutral-950"
        as="li"
      >
        <SettingsGeneral
          title="Re-scrape all restaurants"
          label="Re-scrape all"
          :status="requestsStatuses['scrape-all']"
          @click="onScrapeAll"
        />
      </UPageCard>
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
      <RestaurantAddModal @add-restaurant="onCreateNewRestaurant" />
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import { storeToRefs } from 'pinia';
import { useRequestStatusMap } from '~/composables/use-request-status-map';
import type {
  CreateRestaurantConfig,
  UpdateRestaurantConfig,
} from '~~/server/types/restaurant-config';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const restaurantConfigsStore = useRestaurantConfigsStore();
const { restaurantConfigs } = storeToRefs(restaurantConfigsStore);
const { createNewRestaurant, updateRestaurantConfig } = restaurantConfigsStore;

const { map: requestsStatuses, setStatus } = useRequestStatusMap();

const onCreateNewRestaurant = async (payload: CreateRestaurantConfig) => {
  await createNewRestaurant(payload);
};

const onScrapeAll = async () => {
  setStatus('scrape-all', 'pending');
  const { status } = await useToastFetch('/api/scrapers');
  setStatus('scrape-all', status.value);
};

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
