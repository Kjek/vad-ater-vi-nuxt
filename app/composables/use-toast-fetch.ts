import type { AsyncDataRequestStatus } from '#app';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack/types';

export const useToastFetch = async <T>(
  url: NitroFetchRequest,
  options?: NitroFetchOptions<
    'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'
  >
) => {
  const data = ref<T>();
  const status = ref<AsyncDataRequestStatus>('idle');
  const error = ref<Error>();

  const refresh = async () => {
    status.value = 'pending';
    try {
      const responseData = await $fetch<T>(url, options);
      data.value = responseData;
      status.value = 'success';
    } catch (err) {
      error.value = err as Error;
      status.value = 'error';
    } finally {
      useRequestStatusToast(status, error);
    }
  };

  await refresh();

  return { data, status, error, refresh };
};
