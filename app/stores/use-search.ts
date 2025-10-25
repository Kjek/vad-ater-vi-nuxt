import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref<string>();

  return { searchQuery };
});
