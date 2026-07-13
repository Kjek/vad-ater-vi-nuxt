import { defineStore } from 'pinia';
import type { Configuration } from '@prisma/client';
import { useToastFetch } from '~/composables/use-toast-fetch';
import type { JsonValue } from '@prisma/client/runtime/library';

export const useConfigurationStore = defineStore('configuration', () => {
  const configs = ref<Configuration[]>([]);
  const getConfiguration = (key: string) => {
    useFetch<Configuration>(`/api/configuration/${key}`, {
      server: false,
      onResponse({ response }) {
        if (response._data) {
          configs.value?.push(response._data);
        }
      },
    });
  };

  const updateConfiguration = async (key: string, payload: JsonValue) => {
    const { data } = await useToastFetch<Configuration>(`/api/configuration/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    if (data.value) {
      const index = configs.value.findIndex((config) => config.key === key);

      if (index !== -1) {
        configs.value[index] = data.value;
      }
    }
    return data;
  };

  return {
    configs,
    getConfiguration,
    updateConfiguration,
  };
});
