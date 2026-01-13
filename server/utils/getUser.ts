import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from "h3";

export async function getAuthenticatedUser(event: H3Event) {
  const supabase = await serverSupabaseClient(event)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('[Auth] Unauthorized access attempt:', error?.message)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  return user
}