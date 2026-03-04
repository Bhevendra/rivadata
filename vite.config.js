import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        analytics: resolve(__dirname, "data-analytics.html"),
        engineering: resolve(__dirname, "data-engineering.html"),
        dsai: resolve(__dirname, "data-science-ai.html")
      }
    }
  }
});