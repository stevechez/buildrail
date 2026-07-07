import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    // Injects extracted CSS back into the JS bundle as a <style> tag —
    // keeps the output a single self-contained file.
    cssInjectedByJs(),
  ],

  resolve: {
    alias: {
      // Point the workspace package alias to its source during build.
      "@buildrail/estimator-ui": resolve(
        __dirname,
        "../estimator-ui/src/index.ts"
      ),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/embed.tsx"),
      // Global variable exposed on window: window.BuildRailEstimator
      name: "BuildRailEstimator",
      formats: ["iife"],
      fileName: () => "estimator.js",
    },
    rollupOptions: {
      // Bundle everything — no externals for a standalone drop-in script.
    },
    outDir: "dist",
    // Single file output — don't split chunks.
    cssCodeSplit: false,
    minify: "terser",
    terserOptions: {
      compress: { drop_console: false }, // keep console.error for debugging
    },
    sourcemap: false,
  },
});
