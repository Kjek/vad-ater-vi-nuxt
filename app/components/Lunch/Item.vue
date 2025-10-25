<template>
  <div class="border-b p-6 break-words whitespace-pre-line last:border-none sm:flex">
    <BaseText
      as="h2"
      class="w-fit pb-8 md:w-1/3 md:pb-0"
    >
      <a
        title="Gå till restaurangens hemsida"
        :href="restaurant.homeUrl"
      >
        {{ restaurant.name }}
      </a>
    </BaseText>
    <div class="sm:w-2/3 sm:grow">
      <ul>
        <LunchDaily
          v-for="lunch in restaurant.menu"
          v-show="isDaySelected(lunch.day)"
          :key="lunch.day"
          :day="lunch.day"
          :food="lunch.food"
        />
      </ul>

      <ul
        v-if="restaurant.weeklySpecials.length > 0"
        id="weekly-specials-list"
        class="pt-6"
      >
        <LunchWeekly
          v-for="weeklySpecial in restaurant.weeklySpecials"
          :key="weeklySpecial.type"
          :type="weeklySpecial.type"
          :food="weeklySpecial.food"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LunchDaily from '~/components/Lunch/Daily.vue';
import LunchWeekly from '~/components/Lunch/Weekly.vue';
import type { Restaurant } from '~/types/lunch-menu';

interface Props {
  restaurant: Restaurant;
}

defineProps<Props>();

const { isDaySelected } = useFilterStore();
</script>

<style scoped></style>
