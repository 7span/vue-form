import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@root": path.resolve(__dirname, "./"),
    },
    extensions: [".mjs", ".js", ".jsx", ".json", ".vue", ".scss"],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/plugin.js"),
      name: "VueForm",
      fileName: "vue-form",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
