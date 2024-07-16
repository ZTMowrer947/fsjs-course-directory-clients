<template>
  <div class="grid grid-cols-6">
    <div class="col-span-6">
      <div class="mb-20">
        <h1 class="text-4xl font-bold">{{ course.title }}</h1>
        <h3 class="text-lg">{{ authorText }}</h3>
      </div>
      <MarkdownRenderer :source="course.description" />
    </div>
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
