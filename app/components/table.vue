<template>
  <div role="region" aria-label="Deals table" aria-live="polite" :aria-busy="pending">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-3">
        <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 animate-spin text-gray-400" />
        <p class="text-sm text-gray-600">Loading deals...</p>
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="hasError"
      color="red"
      variant="soft"
      title="Unable to load deals"
      description="Failed to load deals. Please try again later."
      icon="i-heroicons-exclamation-triangle"
    >
      <template #actions>
        <UButton color="red" variant="solid" @click="refresh">Try Again</UButton>
      </template>
    </UAlert>

    <!-- Empty State -->
    <UAlert
      v-else-if="isEmpty"
      color="gray"
      variant="soft"
      title="No deals found"
      description="There are currently no active deals matching your criteria."
      icon="i-heroicons-inbox"
    />

    <!-- Data State -->
    <div v-else>
      <div class="mb-4 flex justify-end">
        <UButton
          label="Download CSV"
          size="md"
          color="primary"
          variant="solid"
          :disabled="!data || data.length === 0"
          aria-label="Download deals data as CSV file"
          @click="() => downloadTableData(data, columns)"
        >
          Download CSV
        </UButton>
      </div>

      <div role="table" aria-label="Deals listing">
        <UTable :data="data" :columns="columns" />
      </div>

      <!-- Pagination wrapped in ClientOnly to avoid hydration errors -->
      <ClientOnly>
        <div
          v-if="paginationInfo && paginationInfo.total_pages > 1"
          class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          role="navigation"
          aria-label="Pagination"
        >
          <div class="text-sm text-gray-600" aria-live="polite">
            Showing
            <span class="font-medium">{{ paginationInfo.count }}</span>
            of
            <span class="font-medium">{{ paginationInfo.total_count }}</span>
            results
          </div>
          <nav role="navigation" aria-label="Pagination" class="flex items-center gap-1">
            <UButton
              v-for="nav in navButtons.slice(0, 2)"
              :key="nav.key"
              :disabled="nav.disabled"
              variant="ghost"
              size="sm"
              :aria-label="nav.label"
              @click="nav.action"
            >
              <UIcon :name="nav.icon" class="h-4 w-4" />
            </UButton>

            <template v-for="page in visiblePages" :key="page">
              <UButton
                v-if="page !== '...'"
                :variant="page === currentPage ? 'solid' : 'ghost'"
                :color="page === currentPage ? 'primary' : 'gray'"
                size="sm"
                :aria-label="`Page ${page}`"
                :aria-current="page === currentPage ? 'page' : undefined"
                @click="goToPage(page)"
              >
                {{ page }}
              </UButton>
              <span v-else class="px-2 text-gray-500">...</span>
            </template>

            <UButton
              v-for="nav in navButtons.slice(2)"
              :key="nav.key"
              :disabled="nav.disabled"
              variant="ghost"
              size="sm"
              :aria-label="nav.label"
              @click="nav.action"
            >
              <UIcon :name="nav.icon" class="h-4 w-4" />
            </UButton>
          </nav>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui';

  const currentPage = ref(1);
  const { data: response, pending, error, refresh, isEmpty, hasError } = useDeals(currentPage);

  const data = computed(() =>
    (response.value?.data?.data?.result ?? []).map((result) => ({
      raise_name: result.name,
      raise_status: result.raise_status.name,
      platform: result.platform_id.name,
      money_raised_to_date: result.funding_gather_money_raised_to_date?.formatted ?? 'N/A',
      valuation: result.valuation?.formatted ?? 'N/A',
    })),
  );

  const paginationInfo = computed(() => {
    const apiData = response.value?.data?.data;
    if (!apiData) return null;

    return {
      count: apiData.count,
      total_count: apiData.total_count,
      total_pages: apiData.total_pages,
      current_page: apiData.current_page,
    };
  });

  const columns: TableColumn<any>[] = [
    { accessorKey: 'raise_name', header: 'Raise' },
    { accessorKey: 'raise_status', header: 'Status' },
    { accessorKey: 'platform', header: 'Platform' },
    { accessorKey: 'money_raised_to_date', header: 'Amount Raised' },
    { accessorKey: 'valuation', header: 'Valuation' },
  ];

  const { downloadTableData } = useCsvDownload();

  // Calculate visible page numbers with ellipsis
  const visiblePages = computed(() => {
    if (!paginationInfo.value) return [];
    const total = paginationInfo.value.total_pages;
    const current = currentPage.value;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current <= 4) {
      for (let i = 2; i <= 5; i++) pages.push(i);
      pages.push('...', total);
    } else if (current >= total - 3) {
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...', total);
    }

    return pages;
  });

  // Navigation buttons configuration
  const navButtons = computed(() => {
    const total = paginationInfo.value?.total_pages || 0;
    return [
      {
        key: 'first',
        label: 'First page',
        icon: 'i-heroicons-chevron-double-left',
        disabled: currentPage.value === 1,
        action: () => goToPage(1),
      },
      {
        key: 'prev',
        label: 'Previous page',
        icon: 'i-heroicons-chevron-left',
        disabled: currentPage.value === 1,
        action: () => goToPage(currentPage.value - 1),
      },
      {
        key: 'next',
        label: 'Next page',
        icon: 'i-heroicons-chevron-right',
        disabled: currentPage.value === total,
        action: () => goToPage(currentPage.value + 1),
      },
      {
        key: 'last',
        label: 'Last page',
        icon: 'i-heroicons-chevron-double-right',
        disabled: currentPage.value === total,
        action: () => goToPage(total),
      },
    ];
  });

  // Unified page navigation function
  const goToPage = (page: number) => {
    const total = paginationInfo.value?.total_pages || 0;
    if (page >= 1 && page <= total && page !== currentPage.value) {
      currentPage.value = page;
      refresh();
    }
  };
</script>
