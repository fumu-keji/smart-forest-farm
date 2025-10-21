import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vitePluginRequire from "vite-plugin-require";

// 通用配置文件
export default defineConfig(mode => {
  return {
    server: {
      host: "0.0.0.0",
      fs: {
        strict: false // 禁用严格模式
      }
    },
    base: "/c8Bcm15TH",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"]
        }
      }
    },
    plugins: [
      vue(),
      vitePluginRequire.default(),
    ],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.css$/i.test(name ?? "")) {
              return "css/[name].[hash][extname]";
            }
            if (/\.(gif|jpe?g|png|svg)$/i.test(name ?? "")) {
              return "images/[name].[hash][extname]";
            }
            return "assets/[name].[hash][extname]";
          },
        },
      },
    }
  };
});

