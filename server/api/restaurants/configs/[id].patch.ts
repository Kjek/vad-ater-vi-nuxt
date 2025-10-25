import { prisma } from '~~/server/utils/prisma';
import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';
import { getServerSession } from '#auth';
import { updateRestaurantConfig } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const body = await readBody<UpdateRestaurantConfig>(event);
  const restaurantId = getRouterParam(event, 'id');
  if (restaurantId) {
    return await updateRestaurantConfig(prisma, restaurantId, body);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
