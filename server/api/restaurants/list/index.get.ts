import { handleGetRestaurants } from '~~/server/helpers/lunch-menu-helper';

export default defineEventHandler(async () => {
  return await handleGetRestaurants();
});
