// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {enabled: true},
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  runtimeConfig: {
    API_KEY: process.env.VITE_API_URL || '', public: {
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }
  },
  supabase: {
    redirect: false
  },
  app: {
    head: {
      title: 'Movie App',
      meta: [{name: 'description', content: 'A movie app that users can save favorite movies.'}],
      htmlAttrs: {
        lang: 'en',
      },
    }
  }
})