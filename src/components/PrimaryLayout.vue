<template>
  <div class="flex-1 flex flex-col">
    <PrimaryHeader
      :user="authQuery.isSuccess.value ? authQuery.data.value : undefined"
      :auth-pending="authQuery.isPending.value"
      @signout="signOut"
    />
    <div class="mx-10 mt-5 flex-1 flex flex-col" data-testid="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { inject, watch } from 'vue';

import { AuthFailError } from '~/entities/errors';
import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';
import { hydrateStoredUserOpts } from '~/routes/(auth)/queries/signin.ts';
import { userKeys } from '~/routes/(auth)/queryKeys.ts';

import PrimaryHeader from './PrimaryHeader.vue';

const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const authQuery = useQuery(hydrateStoredUserOpts(credentialManager));
const queryClient = useQueryClient();

watch(authQuery.error, (error) => {
  if (error instanceof AuthFailError && credentialManager.get()) {
    credentialManager.clear();
  }
});

function signOut() {
  // Remove credentials and invalidate user query
  credentialManager.clear();
  queryClient.invalidateQueries({
    queryKey: userKeys.user,
  });
}
</script>
