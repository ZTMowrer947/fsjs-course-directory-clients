<template>
  <div>
    <h1>This will be a detail page</h1>
    <CourseList v-if="data" :courses="data" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import CourseList from './CourseList.vue';
import { fetchCourseList } from './queries.ts';
import courseKeys from './queryKeys.ts';

const { data } = useQuery({
  queryKey: courseKeys.all,
  queryFn: fetchCourseList,
});
</script>
