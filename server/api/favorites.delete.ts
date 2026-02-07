import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, message: 'Trebuie să fii logat.' })
  }

  const body = await readBody(event)
  const { movie_id } = body

  if (!movie_id) {
    throw createError({ statusCode: 400, message: 'Lipsește ID-ul filmului.' })
  }

  console.log(`🟠 [DEBUG] Cerere de ștergere pentru filmul ID: ${movie_id}`)

  const client = await serverSupabaseClient(event)

  const { error } = await client
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('movie_id', movie_id)

  if (error) {
    console.error('🔴 [DEBUG] EROARE la ștergere:', error)
    throw createError({ statusCode: 500, message: 'Nu s-a putut șterge filmul.' })
  }

  console.log('🗑️  [DEBUG] Film șters cu succes din baza de date!')
  
  return { success: true }
})