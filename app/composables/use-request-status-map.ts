import type { AsyncDataRequestStatus } from '#app';

export function useRequestStatusMap() {
  const map = reactive<Record<string, AsyncDataRequestStatus>>({});

  const setStatus = (key: string, status: AsyncDataRequestStatus) => {
    map[key] = status;
  };

  return { map, setStatus };
}
