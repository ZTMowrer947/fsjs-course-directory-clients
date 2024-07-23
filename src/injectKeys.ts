import { InjectionKey } from 'vue';

import { ICredentialManager } from './lib/credential.ts';

export const credentialManager = Symbol() as InjectionKey<ICredentialManager>;
