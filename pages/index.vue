<script lang="ts" setup>
import type { SearchResult, SearchResults } from "~/types/types";

const movies = ref<SearchResult[] | []>([])

const {data, error} = await useFetch<SearchResults>('/api/movies')

watchEffect(() => {
  if (data.value) {
    movies.value = data.value.results
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
    <template v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie"/>
    </template>
  </div>
</template>

<style scoped>

</style>