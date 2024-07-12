<template>
  <div>
    <ListItem v-for="course in courses" :key="course.id" :course="course" />
  </div>
</template>

<script setup lang="ts">
import type { CoursePreview } from '~/entities/course.ts';

import ListItem from './ListItem.vue';

defineProps<{ courses: CoursePreview[] }>();
</script>
