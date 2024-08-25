// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt'
  ],
  css: [
    "./assets/style.css",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, tailwind-utilities, primevue',
          },
          darkModeSelector: ".dark"
        }
      }
    },
    autoImport: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
