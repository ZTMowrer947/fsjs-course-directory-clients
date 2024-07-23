<template>
  <header class="bg-indigo-500 p-5 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-white">Courses</h1>

    <nav v-if="!authPending">
      <div v-if="user">
        <span class="text-white">Welcome {{ user.firstName }} {{ user.lastName }}!</span>
        <button class="text-gray-300 hover:text-white transition-colors ms-2" @click="handleSignout">Sign Out</button>
      </div>
      <div v-else>
        <RouterLink class="text-gray-300 hover:text-white transition-colors" to="/signin">Sign In</RouterLink>
        <RouterLink class="text-gray-300 hover:text-white transition-colors ms-2" to="/signup">Sign Up</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { RouterLink } from 'vue-router';

import type { User } from '~/entities/user.ts';

defineProps({
  user: {
    type: Object as PropType<User>,
    required: false,
  },
  authPending: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  signout: [];
}>();

function handleSignout() {
  emit('signout');
}
</script>
