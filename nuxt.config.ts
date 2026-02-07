// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

  runtimeConfig: {
    // Aici se va citi cheia API din .env
    apiKey: process.env.TMDB_API_KEY, 
    
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000/',
      // Aici se va citi URL-ul TMDB din .env
      tmdbBaseUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3/'
    }
  },

  supabase: {
    redirect: false
  }
})