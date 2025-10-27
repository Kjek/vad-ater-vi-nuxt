import { defineStore } from 'pinia';
import type { Restaurant } from '~/types/lunch-menu';

export const useRestaurantsStore = defineStore('restaurants', () => {
  const { data, status } = useFetch<Restaurant[]>('/api/restaurants', { server: false });
  const searchQuery = ref<string>();

  const restaurants = computed<Restaurant[]>(() => {
    const all = data.value ?? [];

    if (!searchQuery.value) {
      return all;
    }

    const query = searchQuery.value.toLowerCase();
    return all.filter((r) => r.name.toLowerCase().startsWith(query));
  });

  return { restaurants, status, searchQuery };
});
