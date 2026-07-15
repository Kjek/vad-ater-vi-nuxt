import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const publicRoutes = [
    '/',
    '/admin', // For redirecting purpose
    '/login',
    '/logout',
    '/api/webauthn',
    '/api/restaurants/list',
    '/api/jobs/cron',
  ];

  // /api/auth is excluded because it needs to see if a user is authenticated or not
  if (publicRoutes.includes(event.path) || event.path.startsWith('/api/auth')) {
    return;
  }

  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
});
