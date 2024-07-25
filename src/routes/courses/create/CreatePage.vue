<template>
  <PrimaryLayout>
    <CourseUpsertForm
      v-model:title="formData.title"
      v-model:description="formData.description"
      v-model:estimated-time="formData.estimatedTime"
      v-model:materials-needed="formData.materialsNeeded"
    >
      <template #heading>
        <h1>Create Course</h1>
      </template>

      <template #buttons>
        <button type="submit">Create Course</button>
        <RouterLink :to="{ name: 'course-list' }">Cancel</RouterLink>
      </template>
    </CourseUpsertForm>
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
</script>
