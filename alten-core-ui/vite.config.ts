import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";
  return {
    server: {
      port: 3333,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        scenes: resolve(__dirname, "src", "scenes"),
        redux_config: resolve(__dirname, "src", "redux"),
        common: resolve(__dirname, "src", "common"),
        hooks: resolve(__dirname, "src", "hooks"),
        assets: resolve(__dirname, "src", "assets"),
        rest: resolve(__dirname, "src", "rest")
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
  };
});
