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
      <UPageList
        class="gap-4"
        as="ul"
      >
        <LunchDaily
          v-for="lunch in restaurant.menu"
          v-show="isDaySelected(lunch.day)"
          :key="lunch.day"
          :day="lunch.day"
          :food="lunch.food"
        />
        <li
          v-if="dayIsMissing"
          :key="`${restaurant.name}-error`"
        >
          <BaseText
            variant="h3"
            type="error"
          >
            Fel vid hämtning av menyer gå till restaurangens hemsida istället:
          </BaseText>
          <ULink
            :href="restaurant.homeUrl"
            class="text-red-700 underline dark:text-red-500"
          >
            {{ restaurant.homeUrl }}
          </ULink>
        </li>
      </UPageList>

      <UPageList
        v-if="restaurant.weeklySpecials.length > 0"
        id="weekly-specials-list"
        class="gap-4 pt-6"
        as="ul"
      >
        <LunchWeekly
          v-for="weeklySpecial in restaurant.weeklySpecials"
          :key="weeklySpecial.type"
          :type="weeklySpecial.type"
          :food="weeklySpecial.food"
        />
      </UPageList>
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

const props = defineProps<Props>();

const filterStore = useFilterStore();
const { daysSelected } = storeToRefs(filterStore);
const { isDaySelected } = filterStore;
const dayIsMissing = computed(
  () => !props.restaurant.menu.some((menu) => menu.day === daysSelected.value[0])
);
</script>

<style scoped></style>
