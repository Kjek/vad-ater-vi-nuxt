import { defineStore, storeToRefs } from 'pinia';
import type { Restaurant } from '~/types/lunch-menu';
import { useSearchStore } from './use-search';

export const useRestaurantsStore = defineStore('restaurants', () => {
  const { data, status } = useFetch<Restaurant[]>('/api/restaurants');

  const searchStore = useSearchStore();
  const { searchQuery } = storeToRefs(searchStore);

  const restaurants = computed(() => {
    if (searchQuery && searchQuery.value) {
      const query = searchQuery.value;
      return (
        data.value?.filter((restaurant) => restaurant.name.toLocaleLowerCase().startsWith(query)) ??
        []
      );
    } else {
      return data.value ?? [];
    }
  });

  return { restaurants, status };
});
