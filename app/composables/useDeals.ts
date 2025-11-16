/**
 * Composable for fetching and managing deals data with pagination.
 *
 * @param {Ref<number> | number} [page=1] - The current page number or a ref to it.
 * @returns {{
 *   data: Ref<any>,
 *   pending: Ref<boolean>,
 *   error: Ref<any>,
 *   refresh: () => void,
 *   isEmpty: Ref<boolean>,
 *   hasError: Ref<boolean>
 * }} - Reactive references for the deals data, loading state, error state,
 *       a refresh function, and helpers for empty/error status.
 */

export const useDeals = (page: Ref<number> | number = 1) => {
  const pageRef = typeof page === 'number' ? ref(page) : page;

  const { data, pending, error, refresh } = useFetch('/api/deals', {
    query: computed(() => ({
      page: pageRef.value,
    })),
    key: () => `deals-client-${pageRef.value}`,
    watch: [pageRef],
  });

  const hasError = computed(() => !!error.value);
  const isEmpty = computed(() => {
    if (!data.value || !('data' in data.value) || !data.value.data?.data?.result) return true;
    return data.value.data.data.result.length === 0;
  });

  return {
    data,
    pending,
    error,
    refresh,
    isEmpty,
    hasError,
  };
};
