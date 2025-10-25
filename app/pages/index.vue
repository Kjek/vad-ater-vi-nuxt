<template>
  <UContainer>
    <FilterContainer />
    <UPageList v-if="restaurants.length > 0" as="ul" class="gap-4">
      <UPageCard
        as="li"
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        class="bg-neutral-50 dark:bg-neutral-950"
      >
        <LunchList :restaurant="restaurant" />
      </UPageCard>
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRestaurantsStore } from '~/stores/use-restaurants';

const restaurantsStore = useRestaurantsStore();
const { restaurants } = storeToRefs(restaurantsStore);
</script>
