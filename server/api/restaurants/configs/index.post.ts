import { createRestaurantConfig } from '~~/server/helpers/admin-db-helper';
import type { CreateRestaurantConfig } from '~~/server/types/restaurant-config';

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateRestaurantConfig>(event);
  return await createRestaurantConfig(body);
});
