import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "VueForm",
      fileName: "vue-form",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "vue",
        },
      },
    },
  },
});
