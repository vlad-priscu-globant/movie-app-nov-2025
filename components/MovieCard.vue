<script setup lang="ts">
import type { SearchResult } from "~/types/types";

const props = defineProps<{
  movie: Partial<SearchResult>
}>()
</script>

<template>
  <div  :key="props.movie.id"
        class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition hover:scale-110 duration-600">

    <NuxtLink :to="`movie/${props.movie.id}`">
      <div>
        <img :alt="props.movie.title" :src="`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`"
             class="w-full aspect-[2/3] object-cover" loading="lazy">
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{ props.movie.title }}</h2>
          <p class="text-sm text-grey-400">Release: {{ props.movie.release_date }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>