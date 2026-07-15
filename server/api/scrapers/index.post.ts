import { handleLunchScrapers } from '~~/server/helpers/scraper-helper';

export default defineEventHandler(async (event) => {
  return await handleLunchScrapers();
});
