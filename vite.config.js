import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // to allow cookie storing by brave browser (see it as same origin)
  server: {
    proxy: {
      '/api': {
        target: 'https://blog-api-rjm2.onrender.com',
        changeOrigin: true,
        secure: false, // Allow non-HTTPs connection
      }
    }
  }
})
