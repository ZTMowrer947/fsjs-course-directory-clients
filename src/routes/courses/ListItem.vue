<template>
  <RouterLink :to>
    <h1>{{ course.title }}</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterLinkProps } from 'vue-router';

import type { CoursePreview } from '~/entities/course.ts';

const props = defineProps<{ course: CoursePreview }>();

// Setup router link 'to' prop
const to = computed<RouterLinkProps['to']>(() => `/courses/${encodeURIComponent(props.course.id)}`);
</script>
