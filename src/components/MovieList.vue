<script lang="ts" setup>
import { defineAsyncComponent, onMounted, watch, computed } from "vue";
import type { SearchResult } from "../types/types.ts";
import { movieStore } from "../stores/movieStore.ts";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const MovieRating = defineAsyncComponent(() => import("./partials/MovieRating.vue"))
const route = useRoute()
const router = useRouter()

const store = movieStore();
const { 
  popularMoviesList, 
  currentPopularPage, 
  isLoadingPopular,
  searchList, 
  searchQuery, 
  isLoadingMore, 
  currentSearchPage 
} = storeToRefs(store)

onMounted(async () => {
  // Get page from query params if available
  const pageFromUrl = parseInt(route.query.page as string) || 1;
  const searchFromUrl = route.query.search as string || "";
  
  if (searchFromUrl) {
    // If there's a search query in URL, perform search
    await store.searchMovieList(searchFromUrl, parseInt(route.query.searchPage as string) || 1);
  } else {
    // Load popular movies with the page from URL or fetch if no data
    if (popularMoviesList.value.page === 0 || popularMoviesList.value.results.length === 0 || currentPopularPage.value !== pageFromUrl) {
      await store.fetchPopularMovies(pageFromUrl);
    }
  }
})

// Computed property for the current movies to display
const movies = computed<SearchResult[]>(() => {
  if (searchQuery.value && searchList.value.results.length > 0) {
    return searchList.value.results;
  }
  return popularMoviesList.value.results;
})

// Generate page numbers for pagination
const popularPageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPopularPage.value - 2);
  const endPage = Math.min(popularMoviesList.value.total_pages, startPage + maxPagesToShow - 1);
  
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
  if (page === currentPopularPage.value || isLoadingPopular.value) return;
  
  // Update URL with page parameter
  router.push({ 
    path: '/', 
    query: { 
      ...route.query, 
      page: page.toString() 
    } 
  });
  
  await store.goToPopularPage(page);
}

async function goToSearchPage(page: number) {
  if (page === currentSearchPage.value || !searchQuery.value) return;
  
  // Update URL with search page parameter
  router.push({ 
    path: '/', 
    query: { 
      ...route.query, 
      searchPage: page.toString(),
      search: searchQuery.value 
    } 
  });
  
  await store.goToSearchPage(page);
}

watch(searchList, async (newValue) => {
  if (!searchQuery.value) {
    // Reset to popular movies page 1 when exiting search
    if (popularMoviesList.value.page !== 1) {
      await store.fetchPopularMovies(1);
    }
    return;
  }

  if (Array.isArray(newValue.results) && newValue.results.length === 0 && searchQuery.value) {
    alert('Niciun rezultat gasit. Ne intoarcem la pagina principala');
    store.resetSearch();
    // Go back to current popular movies page or page 1
    if (popularMoviesList.value.page === 0) {
      await store.fetchPopularMovies(1);
    }
    return;
  }
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
      <div v-if="!searchQuery && popularMoviesList.total_pages > 1" class="flex items-center gap-2">
        <!-- Previous Button -->
        <button 
          @click="goToPopularPage(currentPopularPage - 1)"
          :disabled="currentPopularPage <= 1 || isLoadingPopular"
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
            page === currentPopularPage 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
        
        <!-- Next Button -->
        <button 
          @click="goToPopularPage(currentPopularPage + 1)"
          :disabled="currentPopularPage >= popularMoviesList.total_pages || isLoadingPopular"
          class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
        
        <!-- Page Info -->
        <span class="text-gray-500 ml-4">
          Page {{ currentPopularPage }} of {{ popularMoviesList.total_pages }}
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
