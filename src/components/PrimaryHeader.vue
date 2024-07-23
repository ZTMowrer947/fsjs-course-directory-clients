<template>
  <header>
    <h1 class="text-2xl font-bold">Courses</h1>

    <nav v-if="!authPending">
      <div v-if="user">
        <span>Welcome {{ user.firstName }} {{ user.lastName }}!</span>
        <button @click="handleSignout">Sign Out</button>
      </div>
      <div v-else>
        <RouterLink to="/signin">Sign In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
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
