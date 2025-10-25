<template>
  <UPageList
    v-if="hasLeftSlot || hasRightSlot"
    class="flex-row gap-4 self-end"
  >
    <div
      v-if="hasLeftSlot"
      class="flex grow flex-row gap-4"
    >
      <slot name="left" />
    </div>
    <slot
      v-if="hasRightSlot"
      name="right"
    />
  </UPageList>
</template>

<script lang="ts" setup>
const slots = useSlots();
const hasLeftSlot = computed(() => !!slots.left);
const hasRightSlot = computed(() => !!slots.right);
</script>
