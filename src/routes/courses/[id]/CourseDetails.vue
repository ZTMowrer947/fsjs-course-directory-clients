<template>
  <div>
    <div>
      <h1>{{ course.title }}</h1>
      <h3>{{ authorText }}</h3>
    </div>
    <MarkdownRenderer :source="course.description" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { CourseDetail } from '~/entities/course.ts';

// DEBUG: Why does using ~ shorthand to access component not work?
import MarkdownRenderer from '../../../components/MarkdownRenderer.vue';

const props = defineProps<{
  course: CourseDetail;
}>();

const authorText = computed(() => {
  const authorName = [props.course.user.firstName, props.course.user.lastName].join(' ');

  return `By ${authorName}`;
});
</script>
