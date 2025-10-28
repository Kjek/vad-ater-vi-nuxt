import { defineStore } from 'pinia';
import type {
  CreateRestaurantConfig,
  UpdateRestaurantConfig,
} from '~~/server/types/restaurant-config';
import type { RestaurantConfig } from '@prisma/client';
import { useToastFetch } from '~/composables/use-toast-fetch';

export const useRestaurantConfigsStore = defineStore('restaurant-config', () => {
  const configs = ref<RestaurantConfig[]>([]);
  const { status, error, refresh } = useFetch<RestaurantConfig[]>('/api/restaurants/configs', {
    server: false,
    onResponse({ response }) {
      configs.value = response._data ?? [];
    },
  });

  const createNewRestaurant = async (payload: CreateRestaurantConfig) => {
    const { data } = await useToastFetch<RestaurantConfig>('/api/restaurants/configs', {
      method: 'POST',
      body: payload,
    });
    if (data.value) {
      configs.value?.push(data.value);
    }
  };

  const updateRestaurantConfig = async (id: string, payload: UpdateRestaurantConfig) => {
    const { data } = await useToastFetch<RestaurantConfig>(`/api/restaurants/configs/${id}`, {
      method: 'PATCH',
      body: payload,
    });
    if (data.value) {
      const index = configs.value.findIndex((config) => config.restaurantId === id);

      if (index !== -1) {
        configs.value[index] = data.value;
      }
    }
    return data;
  };

  const deleteRestaurantConfig = async (id: string) => {
    const { status } = await useToastFetch(`/api/restaurants/configs/${id}`, {
      method: 'DELETE',
    });

    if (status.value === 'success') {
      configs.value = configs.value.filter((config) => config.restaurantId !== id);
    }
  };

  return {
    restaurantConfigs: configs,
    status,
    error,
    createNewRestaurant,
    updateRestaurantConfig,
    deleteRestaurantConfig,
    refreshConfigs: refresh,
  };
});
