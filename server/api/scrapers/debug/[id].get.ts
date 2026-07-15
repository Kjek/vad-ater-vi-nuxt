import { handleDebugScraper } from '~~/server/helpers/scraper-helper';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (id) {
    return await handleDebugScraper(id);
  }
});
