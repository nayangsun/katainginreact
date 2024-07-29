import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../priv/static",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
    proxy: {},
  },
})
