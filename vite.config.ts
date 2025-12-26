import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      template: 'index.html',
    }),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss";`,
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
    hmr: {
      host: 'localhost',
      port: 3002,
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})