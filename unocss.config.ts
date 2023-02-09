import {
  defineConfig,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['page', 'flex flex-col'],
  ],
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
