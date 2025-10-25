<template>
  <UModal v-model:open="open">
    <UButton
      label="Debug"
      color="neutral"
      variant="outline"
      @click="onDebugClick"
    />
    <template #body>
      <UPageCard>
        <UTextarea
          v-model="data"
          disabled
        />
      </UPageCard>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const open = ref<boolean>(false);
defineShortcuts({
  o: () => (open.value = !open.value),
});

interface Props {
  restaurantId: string;
}

const props = defineProps<Props>();

const { data, status, error, refresh } = useDebugData(props.restaurantId);
const onDebugClick = async () => {
  await refresh();
  useRequestStatusToast(status, error, 'The debug was fetched successfully.');
};
</script>
