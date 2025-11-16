<template>
  <div>
    <div class="mb-2">Current page ref value: {{ currentPage }}</div>

    <UTable :data="data" :columns="columns" />
    <div
      v-if="paginationInfo && paginationInfo.total_pages > 1"
      class="mt-4 flex items-center justify-between"
    >
      <div class="text-sm text-gray-600">
        Showing {{ paginationInfo.count }} of {{ paginationInfo.total_count }} results
      </div>
      <UPagination
        :model-value="currentPage"
        :page-count="paginationInfo.total_pages"
        :total="paginationInfo.total_count"
        @click="handlePageClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui';
  import { computed, ref } from 'vue';

  const currentPage = ref(1);
  const { data: response } = useDeals(currentPage);

  const data = computed(() =>
    (response.value?.data?.data?.result ?? []).map((result) => ({
      raise_name: result.name,
      raise_status: result.raise_status.name,
      platform: result.platform_id.name,
      money_raised_to_date: result.funding_gather_money_raised_to_date.formatted,
    })),
  );

  const paginationInfo = computed(() => {
    if (!response.value?.data?.data) return null;
    return {
      count: response.value.data.data.count,
      total_count: response.value.data.data.total_count,
      total_pages: response.value.data.data.total_pages,
      current_page: response.value.data.data.current_page,
    };
  });

  const columns: TableColumn<any>[] = [
    { accessorKey: 'raise_name', header: 'Raise' },
    { accessorKey: 'raise_status', header: 'Status' },
    { accessorKey: 'platform', header: 'Platform' },
    { accessorKey: 'money_raised_to_date', header: 'Amount Raised' },
  ];

  const handlePageClick = (event: MouseEvent) => {
    const pageNum = parseInt((event.target as HTMLElement).closest('button')?.textContent || '');
    if (!pageNum) return;
    currentPage.value = pageNum;
  };
</script>
