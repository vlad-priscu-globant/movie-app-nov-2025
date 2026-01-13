import { getAuthenticatedUser } from "~/server/utils/getUser";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async(event) => {
  const user = await getAuthenticatedUser(event);
  const client = await serverSupabaseClient<any>(event)
  const body = await readBody(event)
  const { movie_id, movie_data } = body || {}
  if(!movie_id || !movie_data) {
    throw createError({ statusCode: 400, message: 'Missing movie_id or movie_data' })
  }

  /**
   * SQL
   * SELECT id
   * FROM favorites
   * WHERE user_id = 'USER_ID_VALUE'
   *   AND movie_id = MOVIE_ID_VALUE
   * LIMIT 1;
   */
  const { data: existing, error: checkError } = await client
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('movie_id', movie_id)
    .maybeSingle()

  if (checkError) {
    console.error('[POST favorites] Check failed:', checkError)
    throw createError({ statusCode: 500, message: 'Failed to check existing favorites' })
  }

  if (existing) {
    throw createError({ statusCode: 409, message: 'Already in favorites' })
  }

  /**
   * SQL equivalent
   * INSERT INTO favorites (user_id, movie_id, movie_data)
   * VALUES ('USER_ID_VALUE', MOVIE_ID_VALUE, 'MOVIE_DATA_JSON');
   */
  const { error } = await client.from('favorites').insert({
    user_id: user.id,
    movie_id,
    movie_data,
  })

  if (error) {
    console.error('[POST favorites] Insert failed:', error)
    throw createError({ statusCode: 500, message: 'Failed to add favorite' })
  }

  return { success: true }
})