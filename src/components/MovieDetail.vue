<script lang="ts" setup>
import type { SearchResult } from "../types/types.ts";
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { movieStore } from "../stores/movieStore.ts";
import FavoriteItem from "@/components/FavoriteItem.vue";

const movie = ref<SearchResult | null>(null)
const route = useRoute()
const {fetchMovie} = movieStore();
const MovieRating = defineAsyncComponent(() => import("./partials/MovieRating.vue"))
onMounted(async () => {
  try {
   movie.value = await fetchMovie(Number(route.params.id));
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto mt-8">
    <div v-if="movie" class="flex flex-col md:flex-row gap-6">
      <img
        :alt="movie.title"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        class="rounded w-full md:w-1/3"
      />
      <div>
        <h2 class="text-3xl font-bold mb-2">{{ movie.title }}</h2>
        <MovieRating :movie="movie"></MovieRating>
        <p v-if="movie.overview" class="text-gray-300 leading-relaxed">{{ movie.overview }}</p>
        <FavoriteItem v-if="movie" :movie="movie" :readOnly="false"></FavoriteItem>
      </div>
    </div>
    <p v-else class="text-center mt-20 text-gray-400">Loading...</p>
  </div>
</template>

<style scoped>

</style>