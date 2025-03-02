// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['clearwaters.serveo.net']
    // Alternatively, allow any Serveo domain with:
    // allowedHosts: ['.serveo.net']
  }
})
server: {
  allowedHosts: ['.serveo.net']
}
