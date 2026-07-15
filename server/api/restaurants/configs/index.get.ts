import { getAllRestaurantConfigs } from '~~/server/helpers/admin-db-helper';
import type { RestaurantConfig } from '@prisma/client';

export default defineEventHandler(async () => {
  const allRestaurantConfigs = (await getAllRestaurantConfigs()) as RestaurantConfig[];
  return allRestaurantConfigs;
});
