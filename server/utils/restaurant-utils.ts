import type {
  Menu as MenuModel,
  Restaurant as RestaurantModel,
  RestaurantConfig as RestaurantConfigModel,
  WeeklySpecial as WeeklySpecialModel,
} from '@prisma/client';
import { LunchMenu, Restaurant, WeeklySpecial } from '~/types/lunch-menu';
import { sortLunch } from './sort-lunch';

export const convertRestaurant = (
  restaurantModel: RestaurantModel & {
    menu: MenuModel[];
    weeklySpecial: WeeklySpecialModel[];
    restaurantConfig: RestaurantConfigModel | null;
  }
) => {
  return {
    name: restaurantModel.restaurantConfig?.name,
    menu: sortLunch(convertToLunchMenu(restaurantModel.menu)),
    weeklySpecials: convertToWeeklySpecials(restaurantModel.weeklySpecial),
  } as Restaurant;
};

export const convertToLunchMenu = (lunchMenus: MenuModel[]) => {
  return lunchMenus.map((lunchMenu) => ({ day: lunchMenu.day, food: lunchMenu.food }) as LunchMenu);
};

export const convertToWeeklySpecials = (weeklySpecials: WeeklySpecialModel[]) => {
  return weeklySpecials.map(
    (weeklySpecial) => ({ type: weeklySpecial.type, food: weeklySpecial.food }) as WeeklySpecial
  );
};
