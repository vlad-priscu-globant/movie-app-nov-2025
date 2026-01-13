<script lang="ts" setup>
// can accept multiple ['auth', 'another-middleware']
import { useFetch } from "#app";
import type { SearchResult } from "~/types/types";
import MovieCard from "~/components/MovieCard.vue";

definePageMeta({
  middleware: 'auth'
})
const movies = ref<SearchResult[] | []>([])
const {data, error} = await useFetch<any>('/api/favorites')

watchEffect(() => {
  if (data.value) {
    console.log(data.value)
    movies.value = data.value
  }
})

</script>

<template>
  <div>
    <h1>Favorite movies</h1>
    <div
      v-for="movie in movies" :key="movie.id"
      class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <MovieCard :movie="movie.movie_data" />
    </div>
  </div>
</template>

<style scoped>

</style>