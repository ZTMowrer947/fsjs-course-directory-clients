<template>
  <div>
    <form method="post" @submit.prevent.stop="handleSubmit">
      <h1>Sign Up</h1>

      <div>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" required v-model="formData.firstName" />
      </div>

      <div>
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" required v-model="formData.lastName" />
      </div>

      <div>
        <label for="emailAddress">Email Address</label>
        <input type="email" id="emailAddress" v-model="formData.emailAddress" />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>

      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="formData.confirmPassword" />
      </div>

      <div>
        <button type="submit">Sign Up</button>
        <RouterLink to="/courses">Cancel</RouterLink>
        <RouterLink to="/signin">Already have an account?</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import { RouterLink } from 'vue-router';

import type { UserSignUpModel } from '~/entities/user.ts';

type SignUpFormData = UserSignUpModel & {
  confirmPassword: string;
};

const formData = ref<SignUpFormData>({
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
});

function handleSubmit() {
  console.log(toValue(formData));
}
</script>
