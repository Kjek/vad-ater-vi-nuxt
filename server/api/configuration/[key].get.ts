import { getServerSession } from '#auth';
import { getConfiguration } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const key = getRouterParam(event, 'key');
  if (key) {
    return await getConfiguration(key);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
