import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/green-api",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
