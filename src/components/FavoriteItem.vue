<script setup lang="ts">
import type { SearchResult } from "../types/types.ts";
import { onMounted, ref } from "vue";
import { addWatchList, fetchWatchListItem, removeFromWatchList } from "../api/localDb.ts";

const props = defineProps<{
  movie:Partial<SearchResult>
  readOnly?: boolean
  }>()

//TODO how to make this without adding a default id
const localItem = ref<Partial<SearchResult>>({id: 0})
onMounted(async () => {

  if (!props.readOnly) {
    //TODO check because this is not working
    try {
     localItem.value =  await fetchWatchListItem(Number(props.movie.id));
   } catch (err) {
     console.error(err)
  }
}})

function handleAddToFavorite(item: number | null | undefined) {
  if(item) {
    addWatchList(props.movie)
    localItem.value.id = item
  }
}

async function handleremoveFromFavorite(item: number | null | undefined) {
  if(item) {
    await removeFromWatchList(props.movie)
    localItem.value.id = 0
  }
}
</script>

<template>
  <div class="flex" :class="{'pointer-none': readOnly}">
    Favorite:
    <div v-if="props.movie.id == localItem?.id" @click.prevent="handleremoveFromFavorite(props.movie.id)">
      <!-- Active Favorite Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon favorite-active">
        <path d="M12 21.23l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.41L12 21.23z"/>
      </svg>

    </div>
    <div v-else @click="handleAddToFavorite(props.movie.id)">
      <!-- Inactive Favorite Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon favorite-inactive">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>

    </div>
  </div>
</template>

<style scoped>

</style>