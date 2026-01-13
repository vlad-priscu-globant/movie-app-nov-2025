<script lang="ts" setup>
import type { SearchResult } from "~/types/types";

const route = useRoute()

const movie = ref<SearchResult | null>(null)


const {data, error, pending} = await useFetch<SearchResult>('/api/movie/' + route.params.id)

watchEffect(() => {
  if (data.value) {
    movie.value = data.value
  }
})
//TODO include the favorites item
//<FavoriteItem v-if="movie" :movie="movie" :readOnly="false"></FavoriteItem>
</script>

<template>
  <div class="max-w-5xl mx-auto mt-8">
    <div v-if="movie" class="flex flex-col md:flex-row gap-6">
      <img
        :alt="movie.title"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        class="rounded w-full md:w-1/3 aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div>
        <h2 class="text-3xl font-bold mb-2">{{ movie.title }}</h2>
        <MovieRating :movie="movie"></MovieRating>
        <p v-if="movie.overview" class="text-gray-300 leading-relaxed">{{ movie.overview }}</p>
        <FavoriteMovie v-if="movie" :movie="movie" :readOnly="false"></FavoriteMovie>
      </div>
    </div>
    <p v-else class="text-center mt-20 text-gray-400">Loading...</p>
  </div>
</template>

<style scoped>

</style>