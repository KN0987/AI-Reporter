import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target:  "https://ai-summarizer-alpha-nine.vercel.app",
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
})