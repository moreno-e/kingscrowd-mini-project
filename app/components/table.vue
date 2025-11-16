<template>
  <UTable :data="data" :columns="columns" />
</template>

<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui';
  import { computed } from 'vue';

  const { data: response } = await useDeals();

  console.log('response', response.value);

  // TODO: should change data.data
  const data = computed(() =>
    (response.value?.data?.data?.result ?? []).map((result) => ({
      raise_name: result.name,
      raise_status: result.raise_status.name,
      platform: result.platform_id.name,
      money_raised_to_date: result.funding_gather_money_raised_to_date.formatted,
    })),
  );

  const columns: TableColumn<any>[] = [
    { accessorKey: 'raise_name', header: 'Raise' },
    { accessorKey: 'raise_status', header: 'Status' },
    { accessorKey: 'platform', header: 'Platform' },
    { accessorKey: 'money_raised_to_date', header: 'Amount Raised' },
  ];
</script>
