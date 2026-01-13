import { serverSupabaseClient } from '#supabase/server'
import { getAuthenticatedUser } from "../utils/getUser";

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  if (!body || !body.id) {
    throw createError({ statusCode: 400, message: 'Missing movie ID' })
  }

  // Check if the movie belongs to the current user
  const { data: favorite } = await client
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('id', body.id)
    .maybeSingle()

  if (!favorite) {
    throw createError({ statusCode: 403, message: 'Not your favorite to delete' })
  }

  /**
   * SQL equivalent
   * DELETE FROM favorites
   * WHERE id = FAVORITE_ID_VALUE
   *   AND user_id = 'USER_ID_VALUE';
   */
  const { error } = await client
    .from('favorites')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id)

  if (error) {
    console.error('[DELETE favorites] Supabase error:', error)
    throw createError({ statusCode: 500, message: 'Failed to delete favorite' })
  }

  return { success: true }
})