import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS(),
  ],
  build: {
    assetsDir: '',
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    proxy: {
      '/tictactoe/api/tictactoe': {
        target: 'http://localhost:8080/function/tictactoe',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
});
