<template>
  <UPageList
    v-if="hasLeftSlot || hasRightSlot"
    class="flex-row flex-wrap gap-4 self-end sm:flex-nowrap"
  >
    <div
      v-if="hasLeftSlot"
      class="flex flex-row gap-4 sm:grow"
    >
      <slot name="left" />
    </div>
    <div class="flex gap-4">
      <slot
        v-if="hasRightSlot"
        name="right"
      />
    </div>
  </UPageList>
</template>

<script lang="ts" setup>
const slots = useSlots();
const hasLeftSlot = computed(() => !!slots.left);
const hasRightSlot = computed(() => !!slots.right);
</script>
