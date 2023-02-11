import {
  defineConfig,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [
    ['page', 'flex flex-col'],
    ['row', 'flex flex-row'],
    ['column', 'flex flex-col'],
    ['flex-center', 'justify-center items-center'],
  ],
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
})
