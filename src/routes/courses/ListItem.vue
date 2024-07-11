<template>
  <h1>{{ course.title }}</h1>
</template>

<script setup lang="ts">
import type { CoursePreview } from '~/entities/course.ts';

defineProps<{ course: CoursePreview }>();
</script>
