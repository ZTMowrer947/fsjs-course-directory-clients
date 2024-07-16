<template>
  <div>
    <CourseDetail v-if="data" :course="data" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { fetchSingleCourse } from '../queries.ts';
import courseKeys from '../queryKeys.ts';
import CourseDetail from './CourseDetail.vue';

const route = useRoute();
const id = computed(() => Number.parseInt(route.params.id.toString()));

const { data } = useQuery({
  queryKey: courseKeys.byId(id.value),
  queryFn: () => fetchSingleCourse(id.value),
});
</script>
