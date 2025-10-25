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
          @click="onScrapeAll"
        />
      </UPageCard>
      <UPageCard
        v-for="config in restaurantConfigs"
        :key="config.name"
        class="bg-neutral-50 dark:bg-neutral-950"
        as="li"
      >
        <SettingsItem
          :restaurant-id="config.restaurantId"
          :name="config.name"
          :enabled="config.enabled"
          @scrape="onScrapeSingle"
          @activate="onActivateRestaurant"
        />
      </UPageCard>
      <RestaurantAddModal @add-restaurant="onCreateNewRestaurant" />
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
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

const onCreateNewRestaurant = async (payload: CreateRestaurantConfig) => {
  const { status, error } = await createNewRestaurant(payload);
  useRequestStatusToast(status, error, 'The restaurant has been created.');
};

const onScrapeAll = async () => {
  const { status, error } = await useFetch('/api/scrapers');
  useRequestStatusToast(status, error, 'The scrapers ran successfully.');
};

const onScrapeSingle = async (restaurantId: string) => {
  const { status, error } = await useFetch(`/api/scrapers/${restaurantId}`);
  useRequestStatusToast(status, error, 'The scraper ran successfully.');
};

const onActivateRestaurant = async (restaurantId: string, updateConfig: UpdateRestaurantConfig) => {
  const { status, error } = await updateRestaurantConfig(restaurantId, updateConfig);
  useRequestStatusToast(status, error, 'Activated restaurant successfully.');
};
</script>

<style></style>
