import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import tsPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsPaths(), vue()],
});
