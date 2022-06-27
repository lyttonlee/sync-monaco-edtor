import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), monacoEditorPlugin()],
  server: {
    port: 9200
  },
  resolve: {
    alias: {
      '@/': '/src/'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/var.scss";'
      }
    }
  }
})
