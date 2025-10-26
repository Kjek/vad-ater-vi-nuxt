import type {
  UpdateRestaurantConfig,
  CreateRestaurantConfig,
} from '~~/server/types/restaurant-config';
import { scrapeNewData } from './scraper-helper';

export const getRestaurantConfig = async (restaurantId: string) => {
  const restaurant = await prisma.restaurantConfig.findUniqueOrThrow({
    where: {
      restaurantId: restaurantId,
    },
  });
  return {
    ...restaurant,
    lunchRegex: restaurant.lunchRegex?.toRegExp(),
    weeklyRegex: restaurant.weeklyRegex?.toRegExp(),
  };
};

export const getAllRestaurantConfigsMinimal = async () => {
  return await prisma.restaurantConfig.findMany({
    select: { name: true, homeUrl: true, enabled: true },
  });
};

export const getAllRestaurantConfigs = async () => {
  return await prisma.restaurantConfig.findMany({
    select: {
      id: true,
      name: true,
      homeUrl: true,
      lunchUrl: true,
      lunchRegex: true,
      weeklyRegex: true,
      enabled: true,
      restaurantId: true,
    },
  });
};

export const createRestaurantConfig = async (createRestaurantConfig: CreateRestaurantConfig) => {
  const { id } = await prisma.restaurant.create({
    data: {
      restaurantConfig: {
        create: {
          name: createRestaurantConfig.name,
          homeUrl: createRestaurantConfig.homeUrl,
          lunchUrl: createRestaurantConfig.lunchUrl,
          lunchRegex: createRestaurantConfig.lunchRegex,
          weeklyRegex: createRestaurantConfig.weeklyRegex,
          enabled: createRestaurantConfig.enabled,
        },
      },
    },
  });

  await scrapeNewData(id);
};

export const updateRestaurantConfig = async (
  restaurantId: string,
  restaurantConfig: UpdateRestaurantConfig
) => {
  return await prisma.restaurantConfig.update({
    where: {
      restaurantId,
    },
    data: {
      name: restaurantConfig.name,
      homeUrl: restaurantConfig.homeUrl,
      lunchUrl: restaurantConfig.lunchUrl,
      lunchRegex: restaurantConfig.lunchRegex,
      weeklyRegex: restaurantConfig.weeklyRegex,
      enabled: restaurantConfig.enabled,
    },
  });
};

export const deleteRestaurantConfig = async (id: string) => {
  await prisma.restaurant.delete({
    where: {
      id,
    },
  });
};
