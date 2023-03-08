import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
    }),
    AutoImport({
      imports: ['vue/macros', 'uni-app', 'vue'],
      dts: 'typings/auto-imports.d.ts',
      vueTemplate: true,
      ignore: ['createApp'],
    }),
    Unocss(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    proxy: {
      '/files': 'http://localhost:801',
    },
  },
})
