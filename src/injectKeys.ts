import { InjectionKey } from 'vue';

import { ICredentialManager } from './lib/credential.ts';

export const credentialManagerKey = Symbol() as InjectionKey<ICredentialManager>;
