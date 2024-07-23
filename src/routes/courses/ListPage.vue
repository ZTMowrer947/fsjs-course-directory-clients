<template>
  <PrimaryLayout>
    <CourseList v-if="data" :courses="data" />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import PrimaryLayout from '~/components/PrimaryLayout.vue';

import CourseList from './CourseList.vue';
import { fetchCourseList } from './queries.ts';
import courseKeys from './queryKeys.ts';

const { data } = useQuery({
  queryKey: courseKeys.all,
  queryFn: fetchCourseList,
});
</script>
