<template>
  <form method="post" @submit.prevent.stop="handleSubmit">
    <div>
      <slot name="heading"></slot>

      <div>
        <label for="title">Course Title</label>
        <input type="text" id="title" v-model.trim="title" />
      </div>

      <div>
        <label for="description">Course Description</label>
        <textarea id="description" v-model.trim="description"></textarea>
      </div>
    </div>
    <div>
      <div>
        <label for="estimatedTime">Estimated Time</label>
        <input type="text" id="estimatedTime" v-model.trim="estimatedTime" />
      </div>
      <div>
        <label for="materialsNeeded">Materials Needed</label>
        <textarea id="materialsNeeded" v-model.trim="materialsNeeded"></textarea>
      </div>
    </div>
    <div>
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
