<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref, watch, computed } from "vue";
import type { SearchResult, SearchResults } from "../types/types.ts";
import { fetchPopularMovies } from "../api/tmdb.ts";
import { movieStore } from "../stores/movieStore.ts";
import { storeToRefs } from "pinia";

const movies = ref<SearchResult[] | []>([])
const popularMoviesPage = ref<number>(1)
const popularMoviesTotalPages = ref<number>(0)
const isLoadingPopular = ref<boolean>(false)

const MovieRating = defineAsyncComponent(() => import("./partials/MovieRating.vue"))

onMounted(async () => {
  const data: SearchResults = await fetchPopularMovies(1);
  movies.value = data.results;
  popularMoviesTotalPages.value = data.total_pages;
})

const store = movieStore();
const { searchList, searchQuery, isLoadingMore, currentSearchPage } = storeToRefs(store)

// Generate page numbers for pagination
const popularPageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, popularMoviesPage.value - 2);
  const endPage = Math.min(popularMoviesTotalPages.value, startPage + maxPagesToShow - 1);
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
})

const searchPageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentSearchPage.value - 2);
  const endPage = Math.min(searchList.value.total_pages, startPage + maxPagesToShow - 1);
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
})

async function goToPopularPage(page: number) {
  if (page === popularMoviesPage.value || isLoadingPopular.value) return;
  
  isLoadingPopular.value = true;
  try {
    const data: SearchResults = await fetchPopularMovies(page);
    movies.value = data.results;
    popularMoviesPage.value = page;
  } finally {
    isLoadingPopular.value = false;
  }
}

async function goToSearchPage(page: number) {
  if (page === currentSearchPage.value || !searchQuery.value) return;
  await store.goToSearchPage(page);
}

watch(searchList, async (newValue) => {
  if (!searchQuery.value) {
    const data: SearchResults = await fetchPopularMovies(1);
    movies.value = data.results;
    popularMoviesPage.value = 1;
    return;
  }

  if (Array.isArray(newValue.results) && newValue.results.length === 0 && searchQuery.value) {
    alert('Niciun rezultat gasit. Ne intoarcem la pagina principala');
    store.resetSearch();
    const data: SearchResults = await fetchPopularMovies(1);
    movies.value = data.results;
    popularMoviesPage.value = 1;
    return;
  }
 
  movies.value = newValue.results;
})
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <div v-for="movie in movies" :key="movie.id"
           class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition hover:scale-110 duration-600">
        <RouterLink :to="`movie/${movie.id}`">
          <img :alt="movie.title" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`">
          <div class="p-4">
            <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
            <p class="text-sm text-grey-400">Release: {{ movie.release_date }}</p>
            <MovieRating :movie="movie"></MovieRating>
          </div>
        </RouterLink>
      </div>
    </div>
    
    <!-- Loading Spinner for Movies -->
    <div v-if="isLoadingPopular || isLoadingMore" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-lg text-gray-600">Loading movies...</span>
    </div>

    <!-- Page-based Pagination Controls -->
    <div class="flex justify-center items-center gap-2 p-6">
      <!-- Popular Movies Pagination -->
      <div v-if="!searchQuery && popularMoviesTotalPages > 1" class="flex items-center gap-2">
        <!-- Previous Button -->
        <button 
          @click="goToPopularPage(popularMoviesPage - 1)"
          :disabled="popularMoviesPage <= 1 || isLoadingPopular"
          class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        
        <!-- Page Numbers -->
        <button 
          v-for="page in popularPageNumbers" 
          :key="page"
          @click="goToPopularPage(page)"
          :disabled="isLoadingPopular"
          :class="[
            'px-3 py-2 rounded transition-colors cursor-pointer',
            page === popularMoviesPage 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
        
        <!-- Next Button -->
        <button 
          @click="goToPopularPage(popularMoviesPage + 1)"
          :disabled="popularMoviesPage >= popularMoviesTotalPages || isLoadingPopular"
          class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
        
        <!-- Page Info -->
        <span class="text-gray-500 ml-4">
          Page {{ popularMoviesPage }} of {{ popularMoviesTotalPages }}
        </span>
        
        <!-- Loading Indicator with Spinner -->
        <div v-if="isLoadingPopular" class="flex items-center ml-4">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span class="text-blue-600 ml-2">Loading...</span>
        </div>
      </div>
      
      <!-- Search Results Pagination -->
      <div v-if="searchQuery && searchList.total_pages > 1" class="flex items-center gap-2">
        <!-- Previous Button -->
        <button 
          @click="goToSearchPage(currentSearchPage - 1)"
          :disabled="currentSearchPage <= 1 || isLoadingMore"
          class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        
        <!-- Page Numbers -->
        <button 
          v-for="page in searchPageNumbers" 
          :key="page"
          @click="goToSearchPage(page)"
          :disabled="isLoadingMore"
          :class="[
            'px-3 py-2 rounded transition-colors cursor-pointer',
            page === currentSearchPage 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
        
        <!-- Next Button -->
        <button 
          @click="goToSearchPage(currentSearchPage + 1)"
          :disabled="currentSearchPage >= searchList.total_pages || isLoadingMore"
          class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
        
        <!-- Page Info -->
        <span class="text-gray-500 ml-4">
          Page {{ currentSearchPage }} of {{ searchList.total_pages }}
        </span>
        
        <!-- Loading Indicator with Spinner -->
        <div v-if="isLoadingMore" class="flex items-center ml-4">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
          <span class="text-green-600 ml-2">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
