import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    VueRouter({
      importMode: 'async',
      logs: true,
      routesFolder: 'src/pages',
    }),
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
});
