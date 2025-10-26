// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@prisma/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/seo',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://www.xn--vadtervi-2za.nu/',
    name: 'Vad Äter Vi',
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    externals: {
      inline: ['unhead'],
    },
    preset: process.env.VERCEL ? 'vercel' : undefined,
  },

  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js',
      },
    },
  },

  typescript: {
    tsConfig: {
      include: ['types/**/*.d.ts'],
    },
  },

  auth: {
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000/api/auth',
    enableGlobalAppMiddleware: true, // optional, adds built-in route protection
    session: {
      basePath: '/api/auth', // <-- important!
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'only-multiline',
        braceStyle: '1tbs',
        semi: true,
        arrowParens: true,
      },
    },
  },

  robots: {
    allow: ['/'],
    disallow: ['/login', '/admin'],
  },
});
