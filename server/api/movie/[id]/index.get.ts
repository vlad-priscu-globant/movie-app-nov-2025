export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  
  // REPARATIE 1: Folosim URL-ul TMDB, nu localhost
  const url = `${config.public.tmdbBaseUrl}movie/${id}?api_key=${config.apiKey}&language=en-US`

  try {
    const movie = await $fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return movie
  } catch (err: any) {
    console.error('TMDB Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500,
      message: err?.data?.status_message || 'Failed to fetch movie data',
    })
  }
})