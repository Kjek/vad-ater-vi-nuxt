<template>
  <li class="pb-6 last:pb-0">
    <BaseText as="h3">
      {{ day }}
    </BaseText>
    <BaseText as="p">
      {{ food }}
    </BaseText>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  day: string;
  food: string;
}

defineProps<Props>();
</script>

<style scoped></style>
