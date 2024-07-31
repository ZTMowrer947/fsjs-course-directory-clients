<template>
  <div class="flex-1 flex flex-col">
    <PrimaryHeader :user="data ?? undefined" :auth-pending="isPending" @signout="signOut" />
    <div class="mx-10 mt-5 flex-1 flex flex-col" data-testid="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { inject } from 'vue';

import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';
import { authedUserQueryOpts } from '~/routes/(auth)/queries/byStored.ts';
import { userKeys } from '~/routes/(auth)/queryKeys.ts';

import PrimaryHeader from './PrimaryHeader.vue';

const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
const { data, isPending } = useQuery(authedUserQueryOpts(credentialManager));
const queryClient = useQueryClient();

function signOut() {
  // Remove credentials and invalidate user query
  credentialManager.clear();
  queryClient.invalidateQueries({
    queryKey: userKeys.user,
  });
}
</script>
