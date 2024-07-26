<template>
  <PrimaryLayout>
    <div class="flex-1 grid grid-cols-6">
      <form class="col-start-3 col-end-5" method="post" @submit.prevent.stop="handleSubmit">
        <h1 class="text-2xl font-bold">WARNING!</h1>

        <p>
          A deleted course <strong>cannot be recovered</strong>. Please type the title of the course to confirm the
          deletion.
        </p>

        <div class="flex flex-col">
          <label for="title">Title</label>
          <input class="rounded-lg focus:border-indigo-700" type="text" id="title" v-model="title" />
        </div>

        <div class="grid grid-cols-6 gap-1 mt-2">
          <button
            class="col-span-3 border-2 border-red-500 bg-red-500 hover:border-red-700 hover:bg-red-700 transition-colors text-white rounded-lg py-2"
            type="submit"
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
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import PrimaryLayout from '~/components/PrimaryLayout.vue';

const title = ref('');

function handleSubmit() {
  console.log(title.value);
}
</script>
