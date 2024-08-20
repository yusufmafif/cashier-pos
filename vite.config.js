import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'sweetalert2': '/node_modules/sweetalert2/dist/sweetalert2.js'
    }
  },
  build: {
    rollupOptions: {
      external: ['sweetalert2']
    }
  }
})
