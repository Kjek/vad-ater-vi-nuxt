import type { AsyncDataRequestStatus } from '#app';
import { FetchError } from 'ofetch';

export const useRequestStatusToast = (
  status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>,
  error: Ref<FetchError<any> | undefined, FetchError<any> | undefined>,
  description: string
) => {
  const toast = useToast();

  const showToast = (
    status: AsyncDataRequestStatus,
    error: FetchError<any> | undefined,
    description: string
  ) => {
    if (status === 'success') {
      toast.add({
        title: 'Success',
        description,
        color: 'success',
      });
    } else if (status === 'error' || error) {
      toast.add({ title: 'Error', description: error?.message, color: 'error' });
    }
  };

  watch(status, (newStatus) => {
    if (newStatus !== 'pending') {
      showToast(newStatus, error.value, description);
    }
  });
};
