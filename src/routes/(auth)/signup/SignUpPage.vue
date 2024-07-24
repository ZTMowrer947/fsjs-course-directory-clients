<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <form
      class="flex flex-col border-2 border-indigo-500 p-5 w-1/2 lg:w-1/3 2xl:w-1/4"
      method="post"
      @submit.prevent.stop="handleSubmit"
    >
      <h1 class="text-2xl font-bold mb-2">Sign Up</h1>

      <div class="flex flex-col">
        <label for="firstName">First Name</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="text"
          id="firstName"
          placeholder="John"
          required
          v-model="formData.firstName"
        />
      </div>

      <div class="flex flex-col mt-2">
        <label for="lastName">Last Name</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="text"
          id="lastName"
          placeholder="Doe"
          required
          v-model="formData.lastName"
        />
      </div>

      <div class="flex flex-col mt-2">
        <label for="emailAddress">Email Address</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="email"
          id="emailAddress"
          placeholder="john.doe@example.tld"
          v-model="formData.emailAddress"
        />
      </div>

      <div class="flex flex-col mt-2">
        <label for="password">Password</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="password"
          id="password"
          placeholder="johnpassword"
          v-model="formData.password"
        />
      </div>

      <div class="flex flex-col mt-2">
        <label for="confirmPassword">Confirm Password</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="password"
          id="confirmPassword"
          placeholder="Re-type password..."
          v-model="formData.confirmPassword"
        />
      </div>

      <div class="flex w-full justify-evenly mt-10">
        <button
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 hover:border-indigo-700 disabled:bg-indigo-700 transition-colors text-white rounded-lg flex-1 me-2 p-2"
          type="submit"
        >
          Sign Up
        </button>
        <RouterLink
          class="border-2 border-red-500 text-red-500 hover:border-red-700 hover:bg-red-700 hover:text-white transition-colors rounded-lg flex-1 text-center p-2"
          to="/courses"
        >
          Cancel
        </RouterLink>
      </div>
      <div class="flex w-full justify-stretch mt-2">
        <RouterLink
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 hover:border-indigo-700 transition-colors text-white rounded-lg flex-1 text-center p-2"
          to="/signin"
          >Already have an account?</RouterLink
        >
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
