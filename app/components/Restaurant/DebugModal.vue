<template>
  <UModal
    v-model:open="open"
    title="Debug"
    description="See a representation of how the data look like that the scraper returns."
    :ui="{ footer: 'justify-end' }"
  >
    <UButton
      label="Debug"
      color="neutral"
      variant="outline"
      @click="onDebugClick"
    />
    <template #body>
      <div class="flex">
        <UTextarea
          v-model="debugData"
          class="max-h-1/2 grow"
          :loading="status === 'pending'"
          autoresize
          disabled
        />
      </div>
    </template>
    <template #footer>
      <UTooltip
        :text="copied ? 'Copied!' : 'Copy text'"
        :open="copied"
      >
        <UButton
          color="neutral"
          variant="outline"
          :icon="copyIcon"
          aria-label="Copy"
          @click="copyText"
        />
      </UTooltip>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
interface Props {
  restaurantId: string;
}
const open = ref<boolean>(false);
defineShortcuts({
  o: () => (open.value = !open.value),
});

const props = defineProps<Props>();
const copied = ref<boolean>(false);

const { data, status, error, refresh } = useDebugData(props.restaurantId);
const onDebugClick = async () => {
  await refresh();
  useRequestStatusToast(status, error);
};
const debugData = computed(() => (data.value ? JSON.parse(data.value) : 'Loading...'));

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(debugData.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

const copyIcon = computed(() => (copied.value ? 'i-lucide-copy-check' : 'i-lucide-copy'));
</script>
