<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref, watch, computed } from "vue";
import type { SearchResult, SearchResults } from "../types/types.ts";
import { fetchPopularMovies } from "../api/tmdb.ts";
import { movieStore } from "../stores/movieStore.ts";
import { storeToRefs } from "pinia";

const movies = ref<SearchResult[] | []>([])
const popularMoviesPage = ref<number>(1)
const popularMoviesTotalPages = ref<number>(0)
const isLoadingMorePopular = ref<boolean>(false)

const MovieRating = defineAsyncComponent(() => import("./partials/MovieRating.vue"))

onMounted(async () => {
  const data: SearchResults = await fetchPopularMovies(1);
  movies.value = data.results;
  popularMoviesTotalPages.value = data.total_pages;
})

const store = movieStore();
const { searchList, searchQuery, isLoadingMore } = storeToRefs(store)

const canLoadMorePopular = computed(() => 
  !searchQuery.value && popularMoviesPage.value < popularMoviesTotalPages.value && !isLoadingMorePopular.value
)

const canLoadMoreSearch = computed(() => 
  searchQuery.value && searchList.value.page < searchList.value.total_pages && !isLoadingMore.value
)

async function loadMorePopular() {
  if (!canLoadMorePopular.value) return;
  
  isLoadingMorePopular.value = true;
  try {
    const nextPage = popularMoviesPage.value + 1;
    const data: SearchResults = await fetchPopularMovies(nextPage);
    movies.value = [...movies.value, ...data.results];
    popularMoviesPage.value = nextPage;
  } finally {
    isLoadingMorePopular.value = false;
  }
}

async function loadMoreSearch() {
  if (!canLoadMoreSearch.value) return;
  await store.loadMoreSearchResults();
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
    
    <!-- Pagination Controls -->
    <div class="flex justify-center p-6">
      <!-- Load More Popular Movies Button -->
      <button 
        v-if="canLoadMorePopular"
        @click="loadMorePopular"
        :disabled="isLoadingMorePopular"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="isLoadingMorePopular">Loading...</span>
        <span v-else>Load More Movies</span>
      </button>
      
      <!-- Load More Search Results Button -->
      <button 
        v-if="canLoadMoreSearch"
        @click="loadMoreSearch"
        :disabled="isLoadingMore"
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="isLoadingMore">Loading...</span>
        <span v-else>Load More Results</span>
      </button>
      
      <!-- End of Results Message -->
      <div 
        v-if="searchQuery && searchList.page >= searchList.total_pages && searchList.total_pages > 0"
        class="text-gray-500 text-center"
      >
        No more search results to load
      </div>
      
      <div 
        v-if="!searchQuery && popularMoviesPage >= popularMoviesTotalPages && popularMoviesTotalPages > 0"
        class="text-gray-500 text-center"
      >
        No more movies to load
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
