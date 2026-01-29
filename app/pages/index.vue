<template>
  <UContainer>
    <FilterContainer />
    <UPageList
      as="ul"
      class="gap-4 pb-36 md:pb-8"
    >
      <template v-if="restaurants.length > 0">
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
      </template>
      <template v-else>
        <UPageCard
          v-for="item in 2"
          v-show="restaurants.length === 0"
          :key="item"
          class="bg-neutral-50 dark:bg-neutral-950"
        >
          <ItemSkeleton />
        </UPageCard>
      </template>
    </UPageList>
  </UContainer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ItemSkeleton from '~/components/Lunch/ItemSkeleton.vue';
import { useRestaurantsStore } from '~/stores/use-restaurants';

const restaurantsStore = useRestaurantsStore();
const { restaurants } = storeToRefs(restaurantsStore);
defineOgImageComponent('NuxtSeo');
</script>
