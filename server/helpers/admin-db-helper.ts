import type {
  UpdateRestaurantConfig,
  CreateRestaurantConfig,
} from '~~/server/types/restaurant-config';
import { scrapeNewData } from './scraper-helper';
import { toRegExp } from '../utils/string-utils';
import type { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';

export const getRestaurantConfig = async (restaurantId: string) => {
  const restaurant = await prisma.restaurantConfig.findUniqueOrThrow({
    where: {
      restaurantId: restaurantId,
    },
  });
  return restaurant;
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
      enabled: true,
      restaurantId: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const createRestaurantConfig = async (createRestaurantConfig: CreateRestaurantConfig) => {
  const restaurant = await prisma.restaurant.create({
    data: {
      restaurantConfig: {
        create: {
          name: createRestaurantConfig.name,
          homeUrl: createRestaurantConfig.homeUrl,
          lunchUrl: createRestaurantConfig.lunchUrl,
          enabled: createRestaurantConfig.enabled,
        },
      },
    },
    include: { restaurantConfig: true },
  });

  await scrapeNewData(restaurant.id);
  return restaurant.restaurantConfig;
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

export const getConfiguration = async (key: string) => {
  return await prisma.configuration.findUnique({
    where: {
      key,
    },
  });
};

export const addConfiguration = async (key: string, value: JsonValue) => {
  return await prisma.configuration.create({
    data: {
      key,
      value: value as InputJsonValue,
    },
  });
};

export const updateConfiguration = async (key: string, value: JsonValue) => {
  return await prisma.configuration.update({
    where: {
      key,
    },
    data: {
      value: value as InputJsonValue,
    },
  });
};

export const deleteConfiguration = async (key: string) => {
  return await prisma.configuration.delete({
    where: {
      key,
    },
  });
};
