import { handleLunchScrapers } from '~~/server/helpers/scraper-helper';
import { prisma } from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  await handleLunchScrapers(prisma);
});
