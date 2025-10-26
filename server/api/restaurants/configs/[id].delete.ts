import { getServerSession } from '#auth';
import { deleteRestaurantConfig } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const id = getRouterParam(event, 'id');
  if (id) {
    await deleteRestaurantConfig(id);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
