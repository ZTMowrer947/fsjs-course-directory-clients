<template>
  <RouterLink :to class="rounded-md px-5 py-8 bg-indigo-500 hover:bg-indigo-700 transition-colors">
    <h1 class="text-white overflow-ellipsis">{{ course.title }}</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouterLinkProps } from 'vue-router';

import type { CoursePreview } from '~/entities/course.ts';

const props = defineProps<{ course: CoursePreview }>();

// Setup router link 'to' prop
const to = computed<RouterLinkProps['to']>(() => `/courses/${encodeURIComponent(props.course.id)}`);
</script>
