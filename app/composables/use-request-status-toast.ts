/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AsyncDataRequestStatus } from '#app';
import type { FetchError } from 'ofetch';

export const useRequestStatusToast = (
  status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>,
  error: Ref<FetchError<any> | undefined, FetchError<any> | undefined>
) => {
  const toast = useToast();

  const showToast = (status: AsyncDataRequestStatus, error: FetchError<any> | undefined) => {
    if (status === 'success') {
      toast.add({
        title: 'Success',
        color: 'success',
      });
    } else if (status === 'error' || error) {
      toast.add({ title: 'Error', description: error?.message, color: 'error' });
    } else if (status === 'pending') {
      toast.add({
        title: 'Pending',
        color: 'neutral',
      });
    }
  };

  watch(status, (newStatus) => {
    if (newStatus !== 'pending') {
      showToast(newStatus, error.value);
    }
  });
  showToast(status.value, error.value);
};
