// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  routeRules: {
    '/': { redirect: '/inbox' }
  },
  css: [`assets/styles/s.css`, `assets/styles/main.scss`],
  modules: [
    '@pinia/nuxt',
  ],
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500&display=swap" }
      ]
    }
  }
})
