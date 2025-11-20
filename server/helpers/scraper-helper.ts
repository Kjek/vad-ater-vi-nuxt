import { isLunchMenus, isWeekMenu } from '~/types/lunch-menu';
import { getRestaurantConfig } from './admin-db-helper';
import { deleteMenuAndWeekly, updateRestaurantFood } from './db-helper';
import genericWebScraper from '../scrapers/generic';
import { withRetry } from '../utils/scraper-utils';

export const scrapeNewData = async (restaurantId: string) => {
  const { lunchUrl, lunchRegex, weeklyRegex, enabled } = await getRestaurantConfig(restaurantId);
  if (enabled && lunchUrl) {
    const menu = await genericWebScraper(lunchUrl, lunchRegex, weeklyRegex);
    if (isLunchMenus(menu)) {
      await updateRestaurantFood(restaurantId, menu);
    } else if (isWeekMenu(menu)) {
      await updateRestaurantFood(restaurantId, menu.lunchWeek, menu.weeklySpecials);
    }
  }
};

export const handleScraper = async (restaurantId: string) => {
  const { enabled } = await getRestaurantConfig(restaurantId);
  if (enabled) {
    await deleteMenuAndWeekly(restaurantId);
    await scrapeNewData(restaurantId);
  }
};

export const scrapeWithRetry = async (restaurantId: string) => {
  try {
    await withRetry(() => handleScraper(restaurantId));
  } catch (err) {
    console.error(`[SCRAPER ERROR] ${restaurantId}:`, err);
  }
};

export const handleLunchScrapers = async () => {
  const restaurants = await prisma.restaurantConfig.findMany({
    select: { restaurantId: true },
  });

  const results = await Promise.all(
    restaurants.map(({ restaurantId }) => scrapeWithRetry(restaurantId))
  );

  return results;
};

export const handleDebugScraper = async (restaurantId: string) => {
  const { lunchUrl, lunchRegex, weeklyRegex } = await getRestaurantConfig(restaurantId);
  if (lunchUrl) {
    return await genericWebScraper(lunchUrl, lunchRegex, weeklyRegex, true);
  }
};
