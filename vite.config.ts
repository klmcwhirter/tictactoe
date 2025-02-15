import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    solidPlugin(),
    tailwindcss(),
  ],
  build: {
    assetsDir: '',
    target: "esnext",
    // polyfillDynamicImport: false,
  },
  server: {
    port: 9000
  }
});
