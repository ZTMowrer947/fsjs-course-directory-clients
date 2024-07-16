<template>
  <div>
    <h1>{{ course.title }}</h1>
    <h3>{{ authorText }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { CourseDetail } from '~/entities/course.ts';

const props = defineProps<{
  course: CourseDetail;
}>();

const authorText = computed(() => {
  const authorName = [props.course.user.firstName, props.course.user.lastName].join(' ');

  return `By ${authorName}`;
});
</script>
