<template>
  <div>
    <h1>This will be a detail page</h1>
    <ul v-if="data">
      <li v-for="course in data" :key="course.id">
        {{ course.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const { data } = useQuery({
  queryKey: ['courses'],
  queryFn: async () => {
    const res = await fetch('http://localhost:5000/api/courses');

    return res.json();
  },
});
</script>
