// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@compodium/nuxt", '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
  }
});
