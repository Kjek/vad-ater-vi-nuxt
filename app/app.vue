<script lang="ts" setup>
import { Constants } from './types/constants';

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

useSeoMeta({
  title: Constants.title,
  description: Constants.description,
  ogTitle: Constants.title,
  ogDescription: Constants.description,
  twitterCard: 'summary_large_image',
});
const toaster = { expand: false };
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLayout></NuxtLayout>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter class="hidden sm:inline">
      <template #left>
        <p class="text-muted text-sm">
          Built with Nuxt UI • ©
          {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
