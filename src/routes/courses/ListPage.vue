<template>
  <div>
    <h1>This will be a detail page</h1>
    <CourseList v-if="data" :courses="data" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import CourseList from './CourseList.vue';

const { data } = useQuery({
  queryKey: ['courses'],
  queryFn: async () => {
    const res = await fetch('http://localhost:5000/api/courses');

    return res.json();
  },
});
</script>
