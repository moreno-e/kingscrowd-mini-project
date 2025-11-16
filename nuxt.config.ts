// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/test-utils'],
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: false
  },
  runtimeConfig: {
    kingscrowdApiToken: process.env.KINGSCROWD_API_TOKEN,
    kingscrowdDealsApiUrl: process.env.KINGSCROWD_DEALS_API_URL,
    kingscrowdApiHealthUrl: process.env.KINGSCROWD_API_HEALTH_URL
  }
})