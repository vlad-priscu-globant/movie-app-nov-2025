export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { page } = getQuery(event)

  // Folosim URL-ul și Cheia definite în nuxt.config.ts
  const url = `${config.public.tmdbBaseUrl}movie/popular?api_key=${config.apiKey}&language=en-US&page=${page || 1}`

  try {
    const data = await $fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return data
  } catch (error: any) {
    console.error('TMDB Error:', error)
    return { results: [] }
  }
})