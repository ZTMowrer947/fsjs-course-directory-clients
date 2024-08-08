<template>
  <PrimaryLayout>
    <div class="flex-1 grid grid-cols-6" v-if="courseQuery.data">
      <form class="col-start-3 col-end-5" method="post" @submit.prevent.stop="handleSubmit">
        <h1 class="text-2xl font-bold">WARNING!</h1>

        <p>
          A deleted course <strong>cannot be recovered</strong>. Please type the title of the course to confirm the
          deletion.
        </p>

        <p>{{ courseQuery.data.value?.title }}</p>

        <div class="flex flex-col">
          <label for="title">Title</label>
          <input class="rounded-lg focus:border-indigo-700" type="text" id="title" v-model="title" />
        </div>

        <div class="grid grid-cols-6 gap-1 mt-2">
          <button
            class="col-span-3 border-2 border-red-500 bg-red-500 hover:border-red-700 hover:bg-red-700 disabled:border-gray-600 disabled:bg-gray-600 transition-colors text-white rounded-lg py-2"
            type="submit"
            :disabled="courseQuery.data.value?.title !== title"
          >
            DELETE Course
          </button>
          <RouterLink
            class="col-span-3 text-center border-2 border-red-500 text-red-500 hover:border-red-700 hover:bg-red-700 hover:text-white transition-colors rounded-lg py-2"
            :to="{ name: 'course-list' }"
          >
            Cancel
          </RouterLink>
        </div>
      </form>
    </div>
  </PrimaryLayout>
</template>

<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { inject, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import PrimaryLayout from '~/components/PrimaryLayout.vue';
import useCourseId from '~/composables/useCourseId.ts';
import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager, encodeStoredCredentials } from '~/lib/credential.ts';
import { asyncUnwrapOrReject } from '~/lib/result.ts';

import { deleteCourse, type DeleteCourseError } from '../../queries/delete.ts';
import singleCourseQueryOpts from '../../queries/single.ts';
import courseKeys from '../../queryKeys.ts';

const title = ref('');

const id = useCourseId();
const courseQuery = useQuery(singleCourseQueryOpts(id.value));
const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const queryClient = useQueryClient();
const router = useRouter();
const deleteMutation = useMutation<void, DeleteCourseError, void>({
  mutationFn() {
    const deleteResult = encodeStoredCredentials(credentialManager).asyncAndThen((encoded) =>
      deleteCourse(id.value, encoded),
    );

    return asyncUnwrapOrReject(deleteResult);
  },
  onSuccess() {
    // Clear query data for delete course, redirect to listing
    queryClient.invalidateQueries({
      queryKey: courseKeys.byId(id.value),
    });
    router.push({ name: 'course-list' });
  },
});

function handleSubmit() {
  deleteMutation.mutate();
}
</script>
