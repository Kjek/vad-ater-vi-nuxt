import type { LunchMenu } from '~/types/lunch-menu';
import { sweDays, type SwedishDay } from '~/types/swedish-days';

export const sortLunch = (lunchMenu: LunchMenu[]) => {
  return lunchMenu.sort((lhs: LunchMenu, rhs: LunchMenu) =>
    sweDays.indexOf(lhs.day as SwedishDay) > sweDays.indexOf(rhs.day as SwedishDay) ? 1 : -1
  );
};
