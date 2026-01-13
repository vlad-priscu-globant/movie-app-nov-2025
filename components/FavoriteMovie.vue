<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useSupabaseUser } from '#imports'
import type { SearchResult } from '~/types/types'
import LoadingSpinner from "~/components/LoadingSpinner.vue";

interface Favorite {
  movie_id: number
}

const props = defineProps<{
  movie: Partial<SearchResult>
  readOnly?: boolean
}>()

const user = useSupabaseUser()
const isFavorite = ref(false)
const loading = ref(true)
const pending = ref(false)

onMounted(async () => {
  if (!user.value) {
    loading.value = false
    return
  }

  try {
    const { data, error } = await useFetch<Favorite[]>('/api/favorites')

    if (error.value) {
      console.error('Error loading favorites', error.value)
    }

    if (data.value && props.movie.id) {
      isFavorite.value = data.value.some(f => f.movie_id == props.movie.id)
    }
  } catch (err) {
    console.error('Unexpected fetch error', err)
  } finally {
    loading.value = false
  }
})

const toggleFavorite = async () => {
  if (!user.value || !props.movie.id) return

  pending.value = true

  const method = isFavorite.value ? 'DELETE' : 'POST'
  const payload = {
    movie_id: props.movie.id,
    movie_data: props.movie
  }

  const { error } = await useFetch('/api/favorites', {
    method,
    body: payload
  })

  if (!error.value) {
    isFavorite.value = !isFavorite.value
  } else {
    console.error(error.value)
    alert('Something went wrong.')
  }

  pending.value = false
}
</script>
<template>
  <!-- Show loading spinner on first mount -->
  <div v-if="loading">
    <LoadingSpinner></LoadingSpinner>
  </div>

  <!-- Show login prompt if user is not authenticated -->
  <div v-else-if="!user">
    <RouterLink to="/login" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700">
      Login to add to favorites
    </RouterLink>
  </div>

  <!-- Show favorite toggle button -->
  <button
    v-else
    :class="[
      'rounded px-3 py-1 border text-sm transition',
      isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
    ]"
    @click="toggleFavorite"
    :disabled="pending || readOnly"
  >
    <span v-if="pending">Saving...</span>
    <span v-else>
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </span>
  </button>
</template>