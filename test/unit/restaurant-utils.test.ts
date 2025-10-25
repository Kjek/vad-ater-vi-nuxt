import { describe, expect, it, vi } from 'vitest';
import {
  convertRestaurant,
  convertToLunchMenu,
  convertToWeeklySpecials,
} from '../../server/utils/restaurant-utils';

import { sortLunch } from '../../server/utils/sort-lunch';

type MenuModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  day: string;
  food: string;
  restaurantId: string;
};

type RestaurantConfigModel = {
  id: string;
  restaurantId: string;
  name: string;
  enabled: boolean;
  homeUrl: string;
  lunchUrl: string;
  lunchRegex: string | null;
  weeklyRegex: string | null;
};

type WeeklySpecialModel = {
  id: string;
  food: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
};

type RestaurantModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & {
  menu: MenuModel[];
  weeklySpecial: WeeklySpecialModel[];
  restaurantConfig: RestaurantConfigModel | null;
};

vi.mock('../../server/utils/sort-lunch', () => ({
  sortLunch: vi.fn((menus) => menus), // just returns what it gets
}));

describe('convertToLunchMenu', () => {
  it('should map MenuModel[] to LunchMenu[]', () => {
    const input: MenuModel[] = [
      {
        id: '1',
        day: 'Monday',
        food: 'Pizza',
        restaurantId: 'r1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        day: 'Tuesday',
        food: 'Pasta',
        restaurantId: 'r1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const output = convertToLunchMenu(input);
    expect(output).toEqual([
      { day: 'Monday', food: 'Pizza' },
      { day: 'Tuesday', food: 'Pasta' },
    ]);
  });

  it('should handle empty arrays', () => {
    expect(convertToLunchMenu([])).toEqual([]);
  });
});

describe('convertToWeeklySpecials', () => {
  it('should map WeeklySpecialModel[] to WeeklySpecial[]', () => {
    const input: WeeklySpecialModel[] = [
      {
        id: '1',
        type: 'Meat',
        food: 'Steak',
        restaurantId: 'r1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        type: 'Vegan',
        food: 'Salad',
        restaurantId: 'r1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const output = convertToWeeklySpecials(input);
    expect(output).toEqual([
      { type: 'Meat', food: 'Steak' },
      { type: 'Vegan', food: 'Salad' },
    ]);
  });

  it('should handle empty arrays', () => {
    expect(convertToWeeklySpecials([])).toEqual([]);
  });
});

describe('convertRestaurant', () => {
  it('should convert RestaurantModel to Restaurant type', () => {
    const restaurantModel: RestaurantModel = {
      id: 'r1',
      createdAt: new Date(),
      updatedAt: new Date(),
      restaurantConfig: {
        id: 'c1',
        restaurantId: 'r1',
        name: 'Testaurant',
        homeUrl: 'https://example.com',
        lunchUrl: 'https://example.com/menu',
        lunchRegex: '',
        weeklyRegex: '',
        enabled: true,
      },
      menu: [
        {
          id: 'm1',
          day: 'Monday',
          food: 'Pizza',
          restaurantId: 'r1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'm2',
          day: 'Tuesday',
          food: 'Pasta',
          restaurantId: 'r1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      weeklySpecial: [
        {
          id: 'w1',
          type: 'Meat',
          food: 'Steak',
          restaurantId: 'r1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'w2',
          type: 'Fish',
          food: 'Salmon',
          restaurantId: 'r1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    const result = convertRestaurant(restaurantModel);

    expect(result).toEqual({
      name: 'Testaurant',
      menu: [
        { day: 'Monday', food: 'Pizza' },
        { day: 'Tuesday', food: 'Pasta' },
      ],
      weeklySpecials: [
        { type: 'Meat', food: 'Steak' },
        { type: 'Fish', food: 'Salmon' },
      ],
    });

    expect(sortLunch).toHaveBeenCalledOnce();
  });

  it('should handle missing restaurantConfig', () => {
    const restaurantModel: RestaurantModel = {
      id: 'r2',
      restaurantConfig: null,
      menu: [],
      weeklySpecial: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = convertRestaurant(restaurantModel);
    expect(result).toEqual({
      name: undefined,
      menu: [],
      weeklySpecials: [],
    });
  });
});
