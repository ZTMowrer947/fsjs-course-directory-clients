<template>
  <div class="grid grid-cols gap-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <ListItem v-for="course in courses" :key="course.id" :course="course" data-testid="course-item" />
    <RouterLink
      :to="{ name: 'create-course' }"
      class="px-5 py-8 rounded-md bg-gray-300 hover:bg-gray-600 transition-colors text-gray-600 hover:text-white text-center"
    >
      Create Course
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import type { CoursePreview } from '~/entities/course.ts';

import ListItem from './ListItem.vue';

defineProps<{ courses: CoursePreview[] }>();
</script>
