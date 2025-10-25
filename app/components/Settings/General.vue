<template>
  <SettingsItemContent>
    <template
      v-if="title"
      #left
    >
      <BaseText
        v-if="title"
        as="h3"
        class="grow"
      >
        {{ title }}
      </BaseText>
    </template>
    <template #right>
      <UButton
        v-if="label"
        :label="label"
        color="neutral"
        variant="outline"
        @click="onClick"
      />
    </template>
  </SettingsItemContent>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  label?: string;
}

interface Emits {
  (e: 'click'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
const onClick = () => {
  emit('click');
};
</script>
