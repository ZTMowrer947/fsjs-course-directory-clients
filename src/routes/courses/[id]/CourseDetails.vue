<template>
  <div class="grid grid-cols-6">
    <div class="col-span-6 md:col-span-3 xl:col-span-4 mb-10">
      <div class="mb-10">
        <h1 class="text-4xl font-bold mb-2">{{ course.title }}</h1>
        <h3 class="text-lg font-light">{{ authorText }}</h3>
      </div>
      <MarkdownRenderer class="prose" :source="course.description" />
    </div>
    <div data-testid="stats" v-if="hasStats" class="col-span-6 md:col-start-5 md:xl:col-span-2 xl:col-start-6">
      <div class="mb-2" v-if="course.estimatedTime">
        <h4 class="text-lg border-b-2 mb-2">Estimated time</h4>
        <h3 class="text-xl font-bold">{{ course.estimatedTime }}</h3>
      </div>

      <div v-if="course.materialsNeeded">
        <h4 class="text-lg border-b-2 mb-2">Materials Needed</h4>
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
