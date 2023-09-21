import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server : {
    proxy: {
      '/books': 'http://localhost:5000',
      '/add': 'http://localhost:5000',
      '/delete': 'http://localhost:5000',
      '/update' : 'http://localhost:5000',
      '/book': 'http://localhost:5000',
    }
  }
})
