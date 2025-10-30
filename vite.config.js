import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/devops-sre-portfolio-game/', // ✅ Adjust for GitHub Pages
  build: {
    outDir: 'dist',
  },
}))
