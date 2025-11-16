<template>
  <main class="m-20" role="main">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Deals Dashboard</h1>
      <p class="mt-2 text-gray-600">View and manage active investment deals</p>
    </header>

    <Table />
  </main>
</template>

<script setup lang="ts">
  import Table from '~/components/table.vue';

  // Set page title and meta for accessibility
  useHead({
    title: 'Deals Dashboard',
    meta: [
      {
        name: 'description',
        content: 'View and manage active investment deals',
      },
    ],
  });
</script>
