<template>
  <UHeader
    title="Lunch i Sundsvall"
    :toggle="false"
  >
    <template #title>
      <AppLogo class="h-6 w-auto shrink-0" />
      <h1>Lunch i Sundsvall</h1>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        to="https://github.com/Kjek/vad-ater-vi-nuxt"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UHeader>
</template>
