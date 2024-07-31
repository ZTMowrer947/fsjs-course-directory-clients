<template>
  <PrimaryLayout>
    <CourseList v-if="courseListQuery.data.value" :courses="courseListQuery.data.value" />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import PrimaryLayout from '~/components/PrimaryLayout.vue';

import CourseList from './CourseList.vue';
import allCoursesQueryOpts from './queries/all.ts';

const courseListQuery = useQuery(allCoursesQueryOpts);
</script>
