import type { RestaurantConfig } from '@prisma/client';

export interface CreateRestaurantConfig extends Omit<RestaurantConfig, 'id' | 'restaurantId'> {}
export interface UpdateRestaurantConfig
  extends Partial<Omit<RestaurantConfig, 'id' | 'restaurantId'>> {}
