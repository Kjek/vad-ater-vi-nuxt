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
            :state="state"
            class="space-y-4"
            @submit.prevent="onSubmit"
          >
            <UPageList class="gap-4">
              <UFormField
                label="Name"
                name="name"
              >
                <UInput v-model="state.name" />
              </UFormField>
              <UFormField
                label="Homepage URL"
                name="homepage-url"
              >
                <UInput v-model="state.homeUrl" />
              </UFormField>
              <UFormField
                label="Lunch menu URL"
                name="lunch-url"
              >
                <UInput v-model="state.lunchUrl" />
              </UFormField>
              <UFormField
                label="Lunch RegExp (Optional)"
                name="lunch-regex"
              >
                <UInput v-model="state.lunchRegex" />
              </UFormField>
              <UFormField
                label="Weekly RegExp (Optional)"
                name="weekly-regex"
              >
                <UInput v-model="state.weeklyRegex" />
              </UFormField>
              <UFormField
                label="Enabled upon creation"
                name="enabled"
              >
                <UButton
                  :label="state.enabled ? 'Enabled' : 'Disabled'"
                  :color="state.enabled ? 'primary' : 'error'"
                  variant="outline"
                  @click="toggleEnabled"
                />
              </UFormField>
              <div class="flex gap-4 self-end">
                <UButton
                  label="Delete"
                  color="error"
                  variant="outline"
                  @click="onDelete"
                />
                <UButton
                  label="Save"
                  type="submit"
                  color="neutral"
                  variant="outline"
                />
              </div>
            </UPageList>
          </UForm>
        </template>
      </UModal>
    </template>
  </SettingsItemContent>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';
import type { UpdateRestaurantConfig } from '~~/server/types/restaurant-config';
import type { RestaurantConfig } from '@prisma/client';
import { storeToRefs } from 'pinia';

const props = defineProps<{ restaurantId: string }>();
const open = ref<boolean>(false);
defineShortcuts({
  o: () => (open.value = !open.value),
});

const restaurantConfigsStore = useRestaurantConfigsStore();
const { restaurantConfigs } = storeToRefs(restaurantConfigsStore);
const { updateRestaurantConfig, deleteRestaurantConfig } = restaurantConfigsStore;
const state = reactive<RestaurantConfig | Partial<RestaurantConfig>>({
  ...(restaurantConfigs.value?.find((conf) => conf.restaurantId === props.restaurantId) ?? {}),
});

const toggleEnabled = () => {
  state.enabled = !state.enabled;
};

const validate = (state: UpdateRestaurantConfig): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ name: 'name', message: 'Required' });
  if (!state.homeUrl) errors.push({ name: 'homepage-url', message: 'Required' });
  if (!state.lunchUrl) errors.push({ name: 'lunch-url', message: 'Required' });
  return errors;
};

const onSubmit = async () => {
  if (state.restaurantId) {
    await updateRestaurantConfig(state.restaurantId, state as UpdateRestaurantConfig);
    open.value = !open.value;
  }
};

const onDelete = async () => {
  if (state.restaurantId) {
    await deleteRestaurantConfig(state.restaurantId);
    open.value = !open.value;
  }
};
</script>
