import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base '/kupina-website/' только для сборки GitHub Pages — локальная разработка остаётся в корне.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/kupina-website/' : '/',
  plugins: [react()],
})
