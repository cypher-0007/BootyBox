import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repository under /BootyBox/, not at the domain root.
  base: '/BootyBox/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
