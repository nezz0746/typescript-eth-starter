import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  define: {
    global: "globalThis",
  },
  server: {
    port: 3000,
  },
});
