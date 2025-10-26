import type { LunchMenu, WeeklySpecial } from '~/types/lunch-menu';

export const getRestaurantNeedsUpdating = async (id: string) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return { restaurantId: restaurant?.id, updatedAt: restaurant?.updatedAt };
};

export const deleteMenuAndWeekly = async (restaurantId: string) => {
  await prisma.menu.deleteMany({
    where: {
      restaurantId: restaurantId,
    },
  });

  await prisma.weeklySpecial.deleteMany({
    where: {
      restaurantId: restaurantId,
    },
  });
};

export const updateRestaurantFood = async (
  restaurantId: string,
  menu: LunchMenu[],
  weeklySpecials: WeeklySpecial[] = []
) => {
  const restaurant = await prisma.restaurant.findUniqueOrThrow({
    where: {
      id: restaurantId,
    },
    include: {
      menu: true,
      weeklySpecial: true,
      restaurantConfig: true,
    },
  });

  return await prisma.restaurant.upsert({
    where: {
      id: restaurant.id,
    },
    include: {
      menu: true,
      weeklySpecial: true,
      restaurantConfig: true,
    },
    create: {
      menu: {
        createMany: {
          data: menu.map((item) => {
            return {
              day: item.day,
              food: item.food,
            };
          }),
        },
      },
      weeklySpecial: {
        createMany: {
          data: weeklySpecials.map((item) => {
            return {
              type: item.type,
              food: item.food,
            };
          }),
        },
      },
    },
    update: {
      updatedAt: new Date(),
      menu: {
        deleteMany: {
          restaurantId: restaurant.id,
        },
        createMany: {
          data: menu.map((item) => {
            return {
              day: item.day,
              food: item.food,
            };
          }),
        },
      },
      weeklySpecial: {
        deleteMany: {
          restaurantId: restaurant.id,
        },
        createMany: {
          data: weeklySpecials.map((item) => {
            return {
              type: item.type,
              food: item.food,
            };
          }),
        },
      },
    },
  });
};

export const getAllRestaurants = async () => {
  return await prisma.restaurant.findMany({
    include: {
      menu: true,
      weeklySpecial: true,
      restaurantConfig: true,
    },
    orderBy: {
      restaurantConfig: {
        name: 'asc',
      },
    },
  });
};

export const findRestaurantByName = async (name: string) => {
  return await prisma.restaurant.findFirst({
    where: {
      restaurantConfig: {
        name: name,
      },
    },
    include: {
      menu: true,
      weeklySpecial: true,
      restaurantConfig: true,
    },
  });
};

export const searchRestaurantByName = async (searchText: string, limit?: number) => {
  return await prisma.restaurant.findMany({
    include: {
      menu: true,
      weeklySpecial: true,
      restaurantConfig: true,
    },
    where: {
      restaurantConfig: {
        name: {
          startsWith: searchText,
          mode: 'insensitive',
        },
        enabled: true,
      },
    },
    take: limit ?? 100,
  });
};
