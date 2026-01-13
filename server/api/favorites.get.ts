import { serverSupabaseClient } from '#supabase/server'
import { getAuthenticatedUser } from "../utils/getUser";

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('favorites')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('[GET favorites] Supabase error:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch favorites' })
  }

  return data
})