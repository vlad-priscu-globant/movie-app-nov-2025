import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // 1. Verificăm autentificarea folosind funcția standard Nuxt
  const user = await serverSupabaseUser(event)

  if (!user) {
    console.log('🔴 [DEBUG] EROARE: Utilizatorul nu este logat!')
    throw createError({ statusCode: 401, message: 'Trebuie să fii logat pentru a salva favorite.' })
  }

  console.log('🟢 [DEBUG] User logat:', user.id)

  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const { movie_id, movie_data } = body

  if (!movie_id || !movie_data) {
    throw createError({ statusCode: 400, message: 'Lipsesc datele filmului' })
  }

  // 2. Verificăm dacă filmul există deja (ca să nu avem duplicate)
  const { data: existing } = await client
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('movie_id', movie_id)
    .maybeSingle()

  if (existing) {
    console.log('🟡 [DEBUG] Filmul este deja în listă.')
    return { success: true, message: 'Deja salvat' }
  }

  // 3. INSERAREA (Salvăm și JSON-ul, dar și coloanele separate)
  const { error } = await client.from('favorites').insert({
    user_id: user.id,
    movie_id: movie_id,
    
    // Coloana JSON nouă
    movie_data: movie_data,

    // Coloanele vechi (e bine să le avem completate pentru statistici sau afișare simplă)
    title: movie_data.title,
    poster_path: movie_data.poster_path,
    overview: movie_data.overview,
    vote_average: movie_data.vote_average,
    release_date: movie_data.release_date
  })

  if (error) {
    console.error('🔴 [DEBUG] EROARE SUPABASE LA INSERT:', error)
    throw createError({ statusCode: 500, message: error.message })
  }

  console.log('✅ [DEBUG] Film salvat cu succes în baza de date!')
  return { success: true }
})