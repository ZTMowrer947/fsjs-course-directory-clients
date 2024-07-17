<template>
  <div>
    <form method="post" @submit.prevent.stop="handleSubmit">
      <div>
        <label for="emailAddress">Email Address</label>
        <input type="email" id="emailAddress" v-model="formData.emailAddress" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>
      <div>
        <button type="submit">Sign In</button>
        <RouterLink to="/">Cancel</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import type { UserSignInModel } from '~/entities/user.ts';

const formData = ref<UserSignInModel>({
  emailAddress: '',
  password: '',
});

function handleSubmit() {
  console.log(formData.value.emailAddress, formData.value.password);
}
</script>
