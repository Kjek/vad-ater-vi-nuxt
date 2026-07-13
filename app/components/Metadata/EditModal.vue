<template>
  <SettingsItemContent>
    <template #right>
      <UModal
        v-model:open="open"
        title="Edit Restaurant Config"
        description="Edit the restaurants config"
      >
        <UButton
          label="Edit"
          color="neutral"
          variant="outline"
        />
        <template #body>
          <UForm
            :validate="validate"
            :state="ignoredMetadata"
            class="space-y-4"
            @submit.prevent="onSubmit"
          >
            <UFormField
              label="Ignored metadata"
              name="ignored-metadata"
            >
              <UTextarea
                v-model="ignoredMetadata"
                :autoresize="true"
                :maxrows="15"
                class="flex"
              />
            </UFormField>
            <div class="flex self-end">
              <UButton
                label="Save"
                type="submit"
                color="primary"
                variant="outline"
              />
            </div>
          </UForm>
        </template>
      </UModal>
    </template>
  </SettingsItemContent>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';

const METADATA_KEY = 'ignored-metadata';

const open = defineModel<boolean>('open', { required: true });

const configurationStore = useConfigurationStore();
const { getConfiguration, updateConfiguration } = configurationStore;
const { configs } = storeToRefs(configurationStore);
getConfiguration(METADATA_KEY);
const ignoredMetadata = computed({
  get: () =>
    configs.value
      .find((config) => config.key === METADATA_KEY)
      ?.value?.toString()
      .replace(/,\s*/g, ',\n') ?? '',

  set: (value: string) => {
    const config = configs.value.find((config) => config.key === METADATA_KEY);

    if (config) {
      config.value = value.replace(/,\s*\n/g, ', ').trim();
    }
  },
});

const validate = (state: string): FormError[] => {
  const errors = [];
  if (state.endsWith(',')) errors.push({ name: METADATA_KEY, message: 'Required' });
  return errors;
};

const onSubmit = async () => {
  if (!ignoredMetadata.value.endsWith(',')) {
    await updateConfiguration(METADATA_KEY, ignoredMetadata.value.replace(/\n*/g, '').split(','));
  }
};
</script>

<style></style>
