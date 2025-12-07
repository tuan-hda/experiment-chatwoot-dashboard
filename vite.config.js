import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
    middlewareMode: false,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      components: path.resolve("./src/dashboard/components"),
      next: path.resolve("./src/dashboard/components-next"),
      v3: path.resolve("./src/v3"),
      dashboard: path.resolve("./src/dashboard"),
      helpers: path.resolve("./src/shared/helpers"),
      shared: path.resolve("./src/shared"),
      survey: path.resolve("./src/survey"),
      widget: path.resolve("./src/widget"),
      assets: path.resolve("./src/dashboard/assets"),
    },
  },
});
