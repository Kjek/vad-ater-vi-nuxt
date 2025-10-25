<script lang="ts" setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

const title = 'Lunch i Sundsvall';
const description =
  'Vad äter vi? Kolla dagens eller veckans lunch i Sundsvall. Här listas olika restaurangers lunchmenyer för nuvarande vecka så man lätt kan ta reda på vad man vill äta för lunch.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <UApp>
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
