import { getServerSession } from '#auth';

const allowedPrerenderRoutes = (path: string) => {
  return (
    path.startsWith('/_fonts') ||
    path.startsWith('/_nuxt') ||
    path.startsWith('/_payload') ||
    path.startsWith('/_og') ||
    path.startsWith('/__nuxt')
  );
};

export default defineEventHandler(async (event) => {
  const publicRoutes = [
    '/',
    '/admin', // For redirecting purpose
    '/login',
    '/logout',
    '/api/restaurants/list',
    '/api/jobs/cron',
  ];

  // /api/auth is excluded because it needs to see if a user is authenticated or not
  if (
    publicRoutes.includes(event.path) ||
    event.path.startsWith('/api/auth') ||
    event.path.startsWith('/api/webauthn') ||
    allowedPrerenderRoutes(event.path)
  ) {
    return;
  }

  const session = await getServerSession(event);

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
});
