<template>
  <div class="w-full min-h-screen flex flex-col">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { RouterView } from 'vue-router';

import { credentialManagerKey } from './injectKeys.ts';
import { CookieCredentialManager } from './lib/credential.ts';

provide(credentialManagerKey, new CookieCredentialManager());
</script>
