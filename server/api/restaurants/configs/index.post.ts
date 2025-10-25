import { prisma } from '~~/server/utils/prisma';
import { createRestaurantConfig } from '~~/server/helpers/admin-db-helper';
import type { CreateRestaurantConfig } from '~~/server/types/restaurant-config';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const body = await readBody<CreateRestaurantConfig>(event);
  await createRestaurantConfig(prisma, body);
});
