import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use port 3000 for your frontend
    open: true, // Automatically open the browser on server start
  },
})
