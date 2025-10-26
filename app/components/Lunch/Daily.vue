<template>
  <li>
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
