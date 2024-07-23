<template>
  <div>
    <PrimaryHeader :user="data ?? undefined" :auth-pending="isPending" @signout="signOut" />
    <div class="mx-10 mt-5" data-testid="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { inject } from 'vue';

import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';
import { getUserFromCredentials } from '~/routes/(auth)/queries.ts';
import { userKeys } from '~/routes/(auth)/queryKeys.ts';

import PrimaryHeader from './PrimaryHeader.vue';

const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const { data, isPending } = useQuery({
  queryKey: userKeys.user,
  queryFn() {
    // Retrieve credentials, and if found validate them
    const credentials = credentialManager.get();

    if (!credentials) return null;

    return getUserFromCredentials(credentials);
  },
});
const queryClient = useQueryClient();

function signOut() {
  // Remove credentials and invalidate user query
  credentialManager.clear();
  queryClient.invalidateQueries({
    queryKey: userKeys.user,
  });
}
</script>
