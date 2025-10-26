<template>
  <component
    :is="tag"
    :class="cn(tagClasses, typeClasses, attrs.class as ClassValue)"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx';
import { cn } from '~/utils/cn';

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  type?: 'normal' | 'info' | 'error';
}
const { as, type } = defineProps<Props>();
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const tag = computed(() => as ?? 'span');

const tagClasses = computed(() => {
  switch (as) {
    case 'h1':
      return 'text-3xl font-bold';
    case 'h2':
      return 'text-center text-3xl font-bold w-1/3';
    case 'h3':
      return 'text-2xl font-bold';
    case 'h4':
      return 'font-bold ';
    case 'h5':
    case 'h6':
    case 'p':
    case 'span':
    default:
      return 'text-lg ';
  }
});

const typeClasses = computed(() => {
  switch (type) {
    case 'info':
      return 'text-blue-700 dark:text-blue-500';
    case 'error':
      return 'text-red-700 dark:text-red-500';
    default:
      return '';
  }
});
</script>
