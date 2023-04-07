import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import electronRenderer from "vite-plugin-electron/renderer";
import polyfillExports from "vite-plugin-electron/polyfill-exports";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: "index.ts", // 主进程文件
      },
      preload: {
        input: path.join(__dirname, "./electron-preload/index.ts"), // 预加载文件
      },
    }),
    electronRenderer(),
  ],
});
