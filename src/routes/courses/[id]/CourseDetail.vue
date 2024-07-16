<template>
  <div>
    <h1>{{ course.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { CourseDetail } from '~/entities/course.ts';

defineProps<{
  course: CourseDetail;
}>();
</script>
