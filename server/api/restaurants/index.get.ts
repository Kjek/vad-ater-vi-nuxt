import type { Restaurant } from '~/types/lunch-menu';
import { handleGetRestaurants } from '~~/server/helpers/lunch-menu-helper';

export default defineEventHandler(async () => {
  const restaurants = await handleGetRestaurants(prisma);

  return {
    restaurants: restaurants.sort((l, r) => (l.name > r.name ? 1 : -1)),
  };
});
