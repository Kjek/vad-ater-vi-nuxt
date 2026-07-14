<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div
    class="relative flex h-157.5 w-300 flex-col justify-between overflow-hidden bg-white p-18 dark:bg-neutral-900"
  >
    <!-- Brand -->
    <div class="relative flex items-center gap-5">
      <div
        class="ring-default flex items-center justify-center rounded-md bg-neutral-50 p-4 text-[32px] ring dark:bg-neutral-950"
      >
        🍽
      </div>

      <h1 class="text-4xl font-extrabold text-neutral-900 dark:text-neutral-200">{{ title }}</h1>
    </div>

    <!-- Content -->
    <div class="flex flex-col">
      <h2 class="text-6xl font-black text-neutral-900 dark:text-neutral-200">
        {{ subtitle }}
      </h2>

      <p class="content mt-6 text-3xl text-neutral-900 dark:text-neutral-200">
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="relative flex items-center justify-between text-2xl">
      <span class="text-neutral-600 dark:text-neutral-400">{{ motto }}</span>

      <span class="font-bold text-neutral-900 dark:text-neutral-200">{{ link }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  description: string;
  motto: string;
  link: string;
}

defineProps<Props>();
</script>
