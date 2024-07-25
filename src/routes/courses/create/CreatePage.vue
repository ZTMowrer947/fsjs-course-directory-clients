<template>
  <PrimaryLayout>
    <CourseUpsertForm
      v-model:title="formData.title"
      v-model:description="formData.description"
      v-model:estimated-time="formData.estimatedTime"
      v-model:materials-needed="formData.materialsNeeded"
      @submit="handleSubmit"
    >
      <template #heading>
        <h1 class="text-2xl font-bold">Create Course</h1>
      </template>

      <template #buttons>
        <button
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 hover:border-indigo-700 disabled:bg-indigo-700 transition-colors text-white rounded-lg flex-1 me-2 p-2"
          type="submit"
        >
          Create Course
        </button>
        <RouterLink
          class="border-2 border-red-500 text-red-500 hover:border-red-700 hover:bg-red-700 hover:text-white transition-colors rounded-lg flex-1 text-center p-2"
          :to="{ name: 'course-list' }"
        >
          Cancel
        </RouterLink>
      </template>
    </CourseUpsertForm>
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import { RouterLink } from 'vue-router';

import CourseUpsertForm from '~/components/CourseUpsertForm.vue';
import PrimaryLayout from '~/components/PrimaryLayout.vue';
import type { CourseUpsertModel } from '~/entities/course.ts';

const formData = ref<CourseUpsertModel>({
  title: '',
  description: '',
  estimatedTime: null,
  materialsNeeded: null,
});

function handleSubmit() {
  console.log(toValue(formData));
}
</script>
