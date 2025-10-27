<template>
  <UContainer>
    <FilterContainer />
    <UPageList
      v-if="restaurants.length > 0"
      as="ul"
      class="gap-4 pb-32 md:pb-8"
    >
      <UPageCard
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        as="li"
        class="bg-neutral-50 dark:bg-neutral-950"
      >
        <LunchItem
          :restaurant="restaurant"
          data-test="lunch-item"
        />
      </UPageCard>
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRestaurantsStore } from '~/stores/use-restaurants';

const restaurantsStore = useRestaurantsStore();
const { restaurants } = storeToRefs(restaurantsStore);
defineOgImageComponent('NuxtSeo');
</script>
