import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': { // Any request starting with /api will be proxied
        target: 'http://localhost:8050', // Replace with your backend server's address
        changeOrigin: true, // Rewrites the origin header to match the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api from the request path before forwarding
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
