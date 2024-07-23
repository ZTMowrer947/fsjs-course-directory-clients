<template>
  <PrimaryLayout>
    <header class="border-b-2 py-3 px-10 flex justify-start" data-testid="course-nav">
      <RouterLink
        class="bg-indigo-500 hover:bg-indigo-700 transition-colors text-white font-bold rounded-lg p-3 me-2"
        :to="updateTo"
      >
        Update Course
      </RouterLink>
      <RouterLink
        class="bg-indigo-500 hover:bg-indigo-700 transition-colors text-white font-bold rounded-lg p-3 me-2"
        :to="deleteTo"
      >
        Delete Course
      </RouterLink>
      <RouterLink
        class="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white transition-colors font-bold rounded-lg p-2.5"
        to="/courses"
      >
        Back to List
      </RouterLink>
    </header>
    <CourseDetail v-if="course" :course="course" />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import PrimaryLayout from '~/components/PrimaryLayout.vue';

import { fetchSingleCourse } from '../queries.ts';
import courseKeys from '../queryKeys.ts';
import CourseDetail from './CourseDetails.vue';

const route = useRoute();
const id = computed(() => Number.parseInt(route.params.id.toString()));

const updateTo = computed(() => `/courses/${encodeURIComponent(id.value)}/update`);
const deleteTo = computed(() => `/courses/${encodeURIComponent(id.value)}/delete`);

const { data: course } = useQuery({
  queryKey: courseKeys.byId(id.value),
  queryFn: () => fetchSingleCourse(id.value),
});
</script>

<style scoped>
header {
  margin: -1.25rem -2.5rem 1.25rem;
}
</style>
