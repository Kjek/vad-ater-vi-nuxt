import type { RestaurantConfig } from '@prisma/client';

export type CreateRestaurantConfig = Omit<RestaurantConfig, 'id' | 'restaurantId'>;
export type UpdateRestaurantConfig = Partial<Omit<RestaurantConfig, 'id' | 'restaurantId'>>;
