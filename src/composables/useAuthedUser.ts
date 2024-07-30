import { useQuery } from '@tanstack/vue-query';
import { inject } from 'vue';

import { credentialManagerKey } from '~/injectKeys.ts';
import { dummyCredentialManager } from '~/lib/credential.ts';
import { getUserFromStoredCredentials } from '~/routes/(auth)/queries.ts';
import { userKeys } from '~/routes/(auth)/queryKeys.ts';

export default function useAuthedUser() {
  const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
  return useQuery({
    queryKey: userKeys.user,
    queryFn: () => getUserFromStoredCredentials(credentialManager),
  });
}
