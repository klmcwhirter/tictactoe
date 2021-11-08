import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    proxy: {
      '/pytttapi/api/pytttapi': {
        target: 'http://localhost:8080/function/pytttapi',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
});
