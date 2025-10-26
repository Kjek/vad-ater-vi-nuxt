import { getServerSession } from '#auth';
import { handleDebugScraper } from '~~/server/helpers/scraper-helper';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const id = getRouterParam(event, 'id');
  if (id) {
    return await handleDebugScraper(id);
  }
});
