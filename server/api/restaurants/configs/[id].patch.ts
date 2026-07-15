import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';
import { updateRestaurantConfig } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateRestaurantConfig>(event);
  const restaurantId = getRouterParam(event, 'id');
  if (restaurantId) {
    return await updateRestaurantConfig(restaurantId, body);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
