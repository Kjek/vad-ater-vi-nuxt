import { deleteRestaurantConfig } from '~~/server/helpers/admin-db-helper';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (id) {
    await deleteRestaurantConfig(id);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }
});
