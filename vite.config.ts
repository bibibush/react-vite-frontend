import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        // target: "https://foxstocks.site",
        secure: false,
      },
      "/media": {
        target: "http://localhost:8000",
        secure: false,
      },
    },
  },
});
