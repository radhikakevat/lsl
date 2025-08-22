import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8000,
    open: true,
  },
  // server:{
  //   proxy: {
  //     '/api':{ 
  //       target: "https://n4sof8k6r4.execute-api.ap-southeast-2.amazonaws.com",
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/,"")}
  //   }
  // }
})
