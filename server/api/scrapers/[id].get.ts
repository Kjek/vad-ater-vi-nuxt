import { scrapeWithRetry } from '~~/server/helpers/scraper-helper';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (id) {
    await scrapeWithRetry(id);
  }
});
