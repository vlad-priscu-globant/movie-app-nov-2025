<script setup lang="ts">
// defineProps(['movie'])
import type { SearchResult } from "../../types/types.ts";

const props = defineProps<{
  movie:Partial<SearchResult>
}>()
</script>

<template>
  <p class="text-sm text-gray-400 mb-4" >{{ props.movie.release_date }} • ⭐ {{  props.movie?.vote_average?.toFixed(1) }}</p>
</template>

<style scoped>

</style>