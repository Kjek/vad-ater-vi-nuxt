import { handleLunchScrapers } from '~~/server/helpers/scraper-helper';

export default defineEventHandler(async () => {
  await handleLunchScrapers();
});
