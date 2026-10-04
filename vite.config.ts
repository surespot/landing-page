import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Mirror the production nginx rule (/api/* -> backend) so dev is same-origin too.
    proxy: {
      '/api': {
        target: 'https://dev.api.surespot.ng',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
