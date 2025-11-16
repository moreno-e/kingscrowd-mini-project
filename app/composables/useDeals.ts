export const useDeals = (page: Ref<number> | number = 1) => {
  const pageRef = typeof page === 'number' ? ref(page) : page;

  return useFetch('/api/deals', {
    query: {
      page: pageRef,
    },
    key: () => `deals-client-${pageRef.value}`,
  });
};
