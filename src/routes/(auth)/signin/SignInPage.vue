<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <form
      class="flex flex-col border-2 border-indigo-500 rounded-lg p-5"
      method="post"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="flex flex-col">
        <label for="emailAddress">Email Address</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="email"
          id="emailAddress"
          placeholder="test@example.com"
          v-model="formData.emailAddress"
        />
      </div>
      <div class="flex flex-col mt-2">
        <label for="password">Password</label>
        <input
          class="rounded-lg focus:border-indigo-700"
          type="password"
          id="password"
          placeholder="password123"
          required
          v-model="formData.password"
        />
      </div>

      <div class="text-red-500 text-sm">
        <p v-if="status === 'authfail'">Incorrect email/password combination.</p>
      </div>

      <div class="flex w-full justify-evenly mt-10">
        <button
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-700 transition-colors text-white rounded-lg flex-1 me-2 p-2"
          type="submit"
          :disabled="status === 'submitting'"
        >
          Sign In
        </button>
        <RouterLink
          class="border-2 border-indigo-500 bg-indigo-500 hover:bg-indigo-700 transition-colors text-white rounded-lg flex-1 text-center p-2"
          to="/"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { inject, ref, toValue } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import type { UserSignInModel } from '~/entities/user.ts';
import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';

import { getUserFromCredentials } from '../queries.ts';
import { userKeys } from '../queryKeys.ts';

type FormStatus = 'presubmit' | 'submitting' | 'authsuccess' | 'authfail' | 'error';

const formData = ref<UserSignInModel>({
  emailAddress: '',
  password: '',
});

const status = ref<FormStatus>('presubmit');

const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const queryClient = useQueryClient();
const router = useRouter();

function handleSubmit() {
  status.value = 'submitting';

  // Test credentials
  const credentials = toValue(formData);

  getUserFromCredentials(credentials)
    .then((result) => {
      status.value = result !== null ? 'authsuccess' : 'authfail';

      // If successful, persist credentials and user
      if (result !== null) {
        credentialManager.store(credentials);
        queryClient.setQueryData(userKeys.user, result);

        router.push('/');
      }
    })
    .catch((err) => {
      console.error(err);
      status.value = 'error';
    });
}
</script>
