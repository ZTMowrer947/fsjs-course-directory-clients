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
          :disabled="isPending"
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
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { inject, ref, toValue } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import CourseUpsertForm from '~/components/CourseUpsertForm.vue';
import PrimaryLayout from '~/components/PrimaryLayout.vue';
import type { CourseDetail, CourseUpsertModel } from '~/entities/course.ts';
import { AuthFailError } from '~/entities/errors.ts';
import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';
import { asyncUnwrapOrReject } from '~/lib/result.ts';

import { type CourseCreateError,createCourse } from '../queries/create.ts';
import courseKeys from '../queryKeys.ts';

const formData = ref<CourseUpsertModel>({
  title: '',
  description: '',
  estimatedTime: null,
  materialsNeeded: null,
});

const router = useRouter();
const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const queryClient = useQueryClient();
const { mutate, isPending } = useMutation<CourseDetail, CourseCreateError, CourseUpsertModel>({
  async mutationFn(data: CourseUpsertModel) {
    // Grab current credentials, throwing if none are present
    const credentials = credentialManager.get();

    if (!credentials) throw new AuthFailError();

    // Pass credentuals to course creation, along with course data from form
    const encodedCredentials = credentialManager.encode(credentials);

    return asyncUnwrapOrReject(createCourse(encodedCredentials, data));
  },
  onSuccess(courseDetail) {
    // Store data for new course, invalidate query for whole list
    queryClient.setQueryData(courseKeys.byId(courseDetail.id), courseDetail);
    queryClient.invalidateQueries({
      queryKey: courseKeys.all,
    });

    // Redirect to new page
    router.push({
      name: 'course-detail',
      params: {
        id: courseDetail.id,
      },
    });
  },
});

function handleSubmit() {
  // Run mutation
  const courseData = toValue(formData);

  mutate(courseData);
}
</script>
