<template>
  <PrimaryLayout>
    <header class="border-b-2 py-3 px-10 flex justify-start" data-testid="course-nav">
      <RouterLink
        class="bg-indigo-500 hover:bg-indigo-700 transition-colors text-white font-bold rounded-lg p-3 me-2"
        :to="updateTo"
        v-if="courseQuery.data.value && authedUserQuery.data.value?.id === courseQuery.data.value.userId"
      >
        Update Course
      </RouterLink>
      <RouterLink
        class="bg-indigo-500 hover:bg-indigo-700 transition-colors text-white font-bold rounded-lg p-3 me-2"
        :to="deleteTo"
        v-if="courseQuery.data.value && authedUserQuery.data.value?.id === courseQuery.data.value.userId"
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
    <CourseDetail v-if="courseQuery.data.value" :course="courseQuery.data.value" />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import PrimaryLayout from '~/components/PrimaryLayout.vue';
import useAuthedUser from '~/composables/useAuthedUser.ts';
import useCourseId from '~/composables/useCourseId.ts';
import useCourseQuery from '~/composables/useCourseQuery.ts';

import CourseDetail from './CourseDetails.vue';

const id = useCourseId();

const updateTo = computed(() => `/courses/${encodeURIComponent(id.value)}/update`);
const deleteTo = computed(() => `/courses/${encodeURIComponent(id.value)}/delete`);

const courseQuery = useCourseQuery(id);
const authedUserQuery = useAuthedUser();
</script>

<style scoped>
header {
  margin: -1.25rem -2.5rem 1.25rem;
}
</style>
