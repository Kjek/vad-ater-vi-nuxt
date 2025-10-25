import { getServerSession } from '#auth';
import { getAllRestaurantConfigs } from '~~/server/helpers/admin-db-helper';
import type { RestaurantConfig } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const allRestaurantConfigs = (await getAllRestaurantConfigs(prisma)) as RestaurantConfig[];
  return allRestaurantConfigs;
});
