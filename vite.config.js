import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
        proxy: {
          '/api': { // Any request starting with /api will be proxied
            target: 'https://quizmania.projet.sbs', // Replace with your backend server's address
            changeOrigin: true, // Rewrites the origin header to match the target
            rewrite: (path) => path.replace(/^\/api/, '/public'), // Changes /api to /public in the request path
          },
      },
    },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
