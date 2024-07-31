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
        :to="{ name: 'course-list' }"
      >
        Back to List
      </RouterLink>
    </header>
    <CourseDetail v-if="courseQuery.data.value" :course="courseQuery.data.value" />
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { RouterLink, RouterLinkProps } from 'vue-router';

import PrimaryLayout from '~/components/PrimaryLayout.vue';
import useAuthedUser from '~/composables/useAuthedUser.ts';
import useCourseId from '~/composables/useCourseId.ts';

import singleCourseQueryOpts from '../queries/single.ts';
import CourseDetail from './CourseDetails.vue';

type RouteLocation = RouterLinkProps['to'];

const id = useCourseId();

const updateTo = computed<RouteLocation>(() => ({ name: 'update-course', params: { id: id.value } }));
const deleteTo = computed<RouteLocation>(() => ({ name: 'delete-course', params: { id: id.value } }));

const courseQuery = useQuery(singleCourseQueryOpts(id.value));
const authedUserQuery = useAuthedUser();
</script>

<style scoped>
header {
  margin: -1.25rem -2.5rem 1.25rem;
}
</style>
