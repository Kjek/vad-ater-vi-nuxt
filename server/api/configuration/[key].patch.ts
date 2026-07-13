import { getServerSession } from '#auth';
import type { JsonValue } from '@prisma/client/runtime/library';
import { updateConfiguration } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const body = await readBody<JsonValue>(event);
  const key = getRouterParam(event, 'key');
  if (key) {
    return await updateConfiguration(key, body);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
