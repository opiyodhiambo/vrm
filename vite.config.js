import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, strictPort: true, open: false },
  // three.js lives in its own lazy chunk (loaded only when the project machine scrolls into view).
  build: { chunkSizeWarningLimit: 700 },
})
