<script lang="ts" setup>

import { ref } from "vue";
import { movieStore } from "../stores/movieStore.ts";
import { useRoute, useRouter } from "vue-router";

const focused = ref(false);
const searchQuery = ref('')
const route = useRoute()
const router = useRouter()

const store = movieStore();
const {searchMovieList, resetSearch} = store;

async function handleSearch() {
  if (!searchQuery.value.trim()) return;
  
  try {
    // Update URL with search parameter
    router.push({ 
      path: '/', 
      query: { 
        search: searchQuery.value,
        searchPage: '1' 
      } 
    });
    
    await searchMovieList(String(searchQuery.value), 1);
  } catch (err) {
    console.error(err)
  }
}

function clearSearch() {
  searchQuery.value = "";
  resetSearch();
  
  // Remove search parameters from URL
  router.push({ 
    path: '/', 
    query: {} 
  });
}
</script>

<template>
  <div
    class="group relative w-fit mx-auto"
  >
    <input
      v-model="searchQuery"
      class="transition-all duration-300 ease-in-out
             bg-neutral-800 text-white pl-4 pr-10 py-2
             border border-neutral-600 rounded-full
             focus:outline-none focus:w-64
             w-10 group-hover:w-64 cursor-pointer"
      placeholder="Search..."
      type="text"
      @blur="focused = false"
      @focus="focused = true"
      @keyup.enter="handleSearch"
    />

    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors cursor-pointer"
      @click="handleSearch"
    >
      <svg v-if="!searchQuery.length" class="w-5 h-5"
           fill="none" stroke="currentColor"
           stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.85z" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      <svg v-else class="w-6 h-6"
           fill="none"
           stroke="currentColor" stroke-width="1.5"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
           @click="clearSearch">
        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>

    </button>
  </div>
</template>

<style scoped>

</style>
