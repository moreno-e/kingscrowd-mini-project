export const useDeals = async () => {
  return useAsyncData('deals', () => $fetch('/api/deals'));
};
