import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('./src/variable.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  },
})
