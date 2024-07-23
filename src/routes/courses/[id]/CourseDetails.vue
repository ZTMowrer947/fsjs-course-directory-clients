<template>
  <div class="grid grid-cols-6">
    <div class="col-span-6">
      <div class="mb-20">
        <h1 class="text-4xl font-bold">{{ course.title }}</h1>
        <h3 class="text-lg">{{ authorText }}</h3>
      </div>
      <MarkdownRenderer class="prose" :source="course.description" />
    </div>
    <div data-testid="stats" v-if="hasStats" class="col-span-6">
      <div v-if="course.estimatedTime">
        <h4 class="text-lg">Estimated time</h4>
        <h3 class="text-xl">{{ course.estimatedTime }}</h3>
      </div>

      <div v-if="course.materialsNeeded">
        <h4 class="text-lg">Materials Needed</h4>
        <MarkdownRenderer class="prose" :source="course.materialsNeeded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import MarkdownRenderer from '~/components/MarkdownRenderer.vue';
import type { CourseDetail } from '~/entities/course.ts';

const props = defineProps<{
  course: CourseDetail;
}>();

const authorText = computed(() => {
  const authorName = [props.course.user.firstName, props.course.user.lastName].join(' ');

  return `By ${authorName}`;
});

const hasStats = computed(() => !!props.course.estimatedTime || !!props.course.materialsNeeded);
</script>
