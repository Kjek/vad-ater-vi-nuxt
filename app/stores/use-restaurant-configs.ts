import { defineStore } from 'pinia';
import type {
  CreateRestaurantConfig,
  UpdateRestaurantConfig,
} from '~~/server/types/restaurant-config';
import type { RestaurantConfig } from '@prisma/client';

export const useRestaurantConfigsStore = defineStore('restaurant-config', () => {
  const { data, status, error, refresh } = useFetch<RestaurantConfig[]>(
    '/api/restaurants/configs',
    { server: false }
  );

  const createNewRestaurant = async (payload: CreateRestaurantConfig) => {
    const { status, error } = await useFetch<CreateRestaurantConfig>('/api/restaurants/configs', {
      method: 'POST',
      body: payload,
    });

    await refresh();
    return { status, error };
  };

  const updateRestaurantConfig = async (id: string, payload: UpdateRestaurantConfig) => {
    const { data, status, error } = await useFetch<UpdateRestaurantConfig>(
      `/api/restaurants/configs/${id}`,
      {
        method: 'PATCH',
        body: payload,
      }
    );

    console.log(data.value);

    await refresh();
    return { status, error };
  };

  const deleteRestaurantConfig = async (id: string) => {
    const { status, error } = await useFetch(`/api/restaurants/configs/${id}`, {
      method: 'DELETE',
    });

    await refresh();
    return { status, error };
  };

  return {
    restaurantConfigs: data,
    status,
    error,
    createNewRestaurant,
    updateRestaurantConfig,
    deleteRestaurantConfig,
    refresh,
  };
});
