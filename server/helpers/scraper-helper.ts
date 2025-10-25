import { isLunchMenus, isWeekMenu } from '~/types/lunch-menu';
import type { PrismaType } from '../types/prisma-custom';
import { getRestaurantConfig } from './admin-db-helper';
import { deleteMenuAndWeekly, updateRestaurantFood } from './db-helper';
import genericWebScraper from '../scrapers/generic';

export const scrapeNewData = async (prisma: PrismaType, restaurantId: string) => {
  const { lunchUrl, lunchRegex, weeklyRegex, enabled } = await getRestaurantConfig(
    prisma,
    restaurantId
  );
  if (enabled && lunchUrl) {
    const menu = await genericWebScraper(lunchUrl, lunchRegex, weeklyRegex);
    if (isLunchMenus(menu)) {
      await updateRestaurantFood(prisma, restaurantId, menu);
    } else if (isWeekMenu(menu)) {
      await updateRestaurantFood(prisma, restaurantId, menu.lunchWeek, menu.weeklySpecials);
    }
  }
};

export const handleScraper = async (prisma: PrismaType, restaurantId: string) => {
  const { enabled } = await getRestaurantConfig(prisma, restaurantId);
  if (enabled) {
    await deleteMenuAndWeekly(prisma, restaurantId);
    await scrapeNewData(prisma, restaurantId);
  }
};

export const handleLunchScrapers = async (prisma: PrismaType) => {
  const restaurants = await prisma.restaurantConfig.findMany({
    select: {
      restaurantId: true,
    },
  });
  console.log(restaurants);
  await Promise.all(restaurants.map(({ restaurantId }) => handleScraper(prisma, restaurantId)));
};

export const handleDebugScraper = async (prisma: PrismaType, restaurantId: string) => {
  const { lunchUrl, lunchRegex, weeklyRegex } = await getRestaurantConfig(prisma, restaurantId);
  if (lunchUrl) {
    return await genericWebScraper(lunchUrl, lunchRegex, weeklyRegex, true);
  }
};
