<template>
  <div class="grid grid-cols gap-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <ListItem v-for="course in courses" :key="course.id" :course="course" data-testid="course-item" />
  </div>
</template>

<script setup lang="ts">
import type { CoursePreview } from '~/entities/course.ts';

import ListItem from './ListItem.vue';

defineProps<{ courses: CoursePreview[] }>();
</script>
