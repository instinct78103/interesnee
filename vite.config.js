import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { resolve } from 'path';

export default ({ mode }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    server: {
      host: '0.0.0.0',
      proxy: {
        '/sign-form.php': {
          target: process.env.API_URL, // http://<container-name>
          changeOrigin: true,
          secure: false,
        },
        '/save-form.php': {
          target: process.env.API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
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
}
