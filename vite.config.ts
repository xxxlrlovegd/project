import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  build: {
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true, // 删除 console
        drop_debugger: true // 删除 debugger
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
           // 这里可以根据需要添加更多的手动分块逻辑
           if (id.includes("src/components")) {
            return "components"; // 将所有组件放入一个单独的 chunk
          }
        },
        chunkFileNames: (chunkInfo: { facadeModuleId: string }) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `js/${fileName}/[name].[hash].js`;
        }
      }
    },
  },
})
