import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Evita falhas de realpath em pastas Windows cujo nome contem acentos.
    preserveSymlinks: true,
  },
  server: {
    // Encaminha a API para o processo Node quando a interface roda no Vite.
    proxy: {
      '/api': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
})
