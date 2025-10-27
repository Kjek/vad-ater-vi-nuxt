export const useDebugData = (restaurantId: string) => {
  const { data, status, error, refresh } = useFetch<string>(`/api/scrapers/debug/${restaurantId}`, {
    immediate: false,
    server: false,
  });

  return { data, status, error, refresh };
};
