import { convertRestaurant } from '../utils/restaurant-utils';
import { getAllRestaurantConfigs } from './admin-db-helper';
import { getAllRestaurants, searchRestaurantByName } from './db-helper';
import { handleLunchScrapers } from './scraper-helper';

export const handleGetRestaurants = async () => {
  const restaurantConfigs = await getAllRestaurantConfigs();
  const enabledRestaurants = new Map(restaurantConfigs.map((i) => [i.name, i.enabled]));
  const restarantHomeUrls = new Map(restaurantConfigs.map((i) => [i.name, i.homeUrl]));
  let restaurants = (await getAllRestaurants()).map((restaurant) => convertRestaurant(restaurant));
  if (restaurants.length === 0) {
    await handleLunchScrapers();
    restaurants = (await getAllRestaurants()).map((restaurant) => convertRestaurant(restaurant));
  }

  return restaurants
    .map((restaurant) => {
      return {
        ...restaurant,
        homeUrl: restarantHomeUrls.get(restaurant.name),
      };
    })
    .filter((restaurant) => enabledRestaurants.get(restaurant.name));
};

export const handleLunchSearch = async (searchText: string, limit?: number) => {
  return (await searchRestaurantByName(searchText, limit)).map((restaurant) =>
    convertRestaurant(restaurant)
  );
};
