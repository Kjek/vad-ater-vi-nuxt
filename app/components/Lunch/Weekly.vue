<template>
  <li>
    <BaseText as="h4">
      {{ type }}
    </BaseText>
    <BaseText as="h5">
      {{ food }}
    </BaseText>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  type: string;
  food: string;
}

defineProps<Props>();
</script>

<style scoped></style>
