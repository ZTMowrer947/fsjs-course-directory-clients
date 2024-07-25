<template>
  <form class="w-full flex-1 grid grid-cols-12" method="post" @submit.prevent.stop="handleSubmit">
    <div class="w-full flex flex-col col-span-12 md:col-span-6 xl:col-span-8">
      <slot name="heading"></slot>

      <div class="flex flex-col mt-2">
        <label for="title">Course Title</label>
        <input class="rounded-lg focus:border-indigo-700" type="text" id="title" v-model.trim="title" />
      </div>

      <div class="flex flex-col mt-2 flex-1">
        <label for="description">Course Description</label>
        <textarea
          class="rounded-lg focus:border-indigo-700 flex-1"
          id="description"
          v-model.trim="description"
        ></textarea>
      </div>
    </div>
    <div class="w-full flex flex-col col-span-12 md:col-start-8 md:xl:col-span-5 xl:col-start-10 xl:col-span-3">
      <div class="flex flex-col mt-2 md:mt-10">
        <label for="estimatedTime">Estimated Time</label>
        <input class="rounded-lg hover:border-indigo-700" type="text" id="estimatedTime" v-model.trim="estimatedTime" />
      </div>
      <div class="flex flex-col mt-2 flex-1">
        <label for="materialsNeeded">Materials Needed</label>
        <textarea
          class="rounded-lg hover:border-indigo-700 flex-1"
          id="materialsNeeded"
          v-model.trim="materialsNeeded"
        ></textarea>
      </div>
    </div>
    <div class="flex justify-start items-center col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <slot name="buttons"></slot>
    </div>
  </form>
</template>

<script lang="ts" setup>
// Form model setup
const title = defineModel<string>('title', {
  required: true,
});
const description = defineModel<string>('description', {
  required: true,
});
const estimatedTime = defineModel<string | null>('estimatedTime', {
  required: true,
  set(value) {
    return value === '' ? null : value;
  },
  get(value) {
    return value === null ? '' : value;
  },
});

const materialsNeeded = defineModel<string | null>('materialsNeeded', {
  required: true,
  set(value) {
    return value === '' ? null : value;
  },
  get(value) {
    return value === null ? '' : value;
  },
});

// Component emits
const emit = defineEmits<{
  submit: [];
}>();

function handleSubmit() {
  emit('submit');
}
</script>
