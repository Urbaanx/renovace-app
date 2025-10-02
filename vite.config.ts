import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true, // Pozwala na nasłuchiwanie z zewnątrz
    port: 5173,      // Port Vite
    strictPort: true, // Upewnia się, że port nie zostanie zmieniony
    allowedHosts:["renovace.ais.pl"]
  },
  css: {
    postcss: './postcss.config.js',
  },
})
