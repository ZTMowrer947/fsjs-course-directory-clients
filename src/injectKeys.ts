import type { InjectionKey } from 'vue';

import type { ICredentialManager } from './lib/credential.ts';

export const credentialManagerKey = Symbol() as InjectionKey<ICredentialManager>;
