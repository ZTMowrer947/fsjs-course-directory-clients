<template>
  <PrimaryLayout>
    <CourseUpsertForm
      v-model:title="formData.title"
      v-model:description="formData.description"
      v-model:estimated-time="formData.estimatedTime"
      v-model:materials-needed="formData.materialsNeeded"
      @submit="handleSubmit"
      v-if="courseQuery.isSuccess"
    >
      <template #heading>
        <h1 class="text-2xl font-bold">Update Course</h1>
      </template>

      <template #buttons>
        <button
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 hover:border-indigo-700 disabled:bg-indigo-700 transition-colors text-white rounded-lg flex-1 me-2 p-2"
          type="submit"
        >
          Update Course
        </button>
        <RouterLink
          class="border-2 border-red-500 text-red-500 hover:border-red-700 hover:bg-red-700 hover:text-white transition-colors rounded-lg flex-1 text-center p-2"
          :to="{ name: 'course-detail', params: { id } }"
        >
          Cancel
        </RouterLink>
      </template>
    </CourseUpsertForm>
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { inject, ref, toValue, watch } from 'vue';
import { useRouter } from 'vue-router';

import CourseUpsertForm from '~/components/CourseUpsertForm.vue';
import PrimaryLayout from '~/components/PrimaryLayout.vue';
import useCourseId from '~/composables/useCourseId.ts';
import type { CourseUpsertModel } from '~/entities/course.ts';
import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';

import singleCourseQueryOpts from '../../queries/single.ts';
import { updateCourse } from '../../queries/update.ts';
import courseKeys from '../../queryKeys.ts';

const id = useCourseId();
const courseQuery = useQuery(singleCourseQueryOpts(id.value));
const credentialManager = inject(credentialManagerKey, dummyCredentialManager);

const router = useRouter();
const queryClient = useQueryClient();
const updateMutation = useMutation({
  mutationFn: (updateData: CourseUpsertModel) => {
    return updateCourse(id.value, updateData, credentialManager);
  },
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: courseKeys.byId(id.value),
    });

    router.push({ name: 'course-detail', params: { id: id.value } });
  },
});

const formData = ref<CourseUpsertModel>({
  title: '',
  description: '',
  estimatedTime: null,
  materialsNeeded: null,
});

// Populate fields with default data
watch(
  courseQuery.data,
  (newData, prevData) => {
    if (prevData === undefined && newData) {
      formData.value = {
        title: newData.title,
        description: newData.description,
        estimatedTime: newData.estimatedTime,
        materialsNeeded: newData.materialsNeeded,
      };
    }
  },
  { immediate: true },
);

function handleSubmit() {
  const data = toValue(formData);

  updateMutation.mutate(data);
}
</script>
