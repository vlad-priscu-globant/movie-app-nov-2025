import { ref } from "vue";
import { defineStore } from 'pinia'
import type { SearchResult, SearchResults } from "../types/types.ts";
import { fetchMovieById, searchMovie } from "../api/tmdb.ts";

export const movieStore = defineStore('movieStore', () => {

  /**
   *  Record<number, SearchResult>
   * This is a TypeScript utility type. Here's what it means:
   *
   * Record<K, V> means "an object with keys of type K and values of type V".
   *
   * number = key should be movie ID (number).
   *
   * SearchResult = each value will follow the SearchResult interface/type.
   */
  const movieCache = ref<Record<number, SearchResult>>({})
  
  // Popular movies state
  const popularMoviesList = ref<SearchResults>({ page: 0, results: [], total_pages: 0, total_results: 0 })
  const currentPopularPage = ref<number>(1)
  const isLoadingPopular = ref<boolean>(false)
  
  // Search state
  const searchList = ref<SearchResults>({ page: 0, results: [], total_pages: 0, total_results: 0 })
  const searchQuery = ref<string>("")
  const currentSearchPage = ref<number>(1)
  const isLoadingMore = ref<boolean>(false)

  async function fetchMovie(id: number): Promise<SearchResult> {
    if (movieCache.value[id]) {
      return movieCache.value[id];
    }
    const data = await fetchMovieById(id);
    movieCache.value[id] = data || {}
    return data
  }

  async function searchMovieList(query: string, page: number = 1): Promise<SearchResults> {
    searchQuery.value = query;
    currentSearchPage.value = page;
    
    const data = await searchMovie(query, page);
    
    // For page-based navigation, replace results instead of appending
    searchList.value = data;
    
    return data;
  }

  async function goToSearchPage(page: number): Promise<SearchResults | null> {
    if (isLoadingMore.value || !searchQuery.value) {
      return null;
    }
    
    if (page < 1 || page > searchList.value.total_pages) {
      return null;
    }
    
    isLoadingMore.value = true;
    try {
      const data = await searchMovieList(searchQuery.value, page);
      return data;
    } finally {
      isLoadingMore.value = false;
    }
  }

  async function fetchPopularMovies(page: number = 1): Promise<SearchResults> {
    currentPopularPage.value = page;
    
    // Import the API function here to avoid circular dependency
    const { fetchPopularMovies: fetchPopularMoviesAPI } = await import("../api/tmdb.ts");
    const data = await fetchPopularMoviesAPI(page);
    
    // Store the popular movies data
    popularMoviesList.value = data;
    
    return data;
  }

  async function goToPopularPage(page: number): Promise<SearchResults | null> {
    if (isLoadingPopular.value) {
      return null;
    }
    
    if (page < 1 || (popularMoviesList.value.total_pages > 0 && page > popularMoviesList.value.total_pages)) {
      return null;
    }
    
    isLoadingPopular.value = true;
    try {
      const data = await fetchPopularMovies(page);
      return data;
    } finally {
      isLoadingPopular.value = false;
    }
  }

  function resetSearch(): void {
    searchList.value = { page: 0, results: [], total_pages: 0, total_results: 0 };
    searchQuery.value = "";
    currentSearchPage.value = 1;
    isLoadingMore.value = false;
  }

  return {
    // Movie cache
    movieCache, 
    fetchMovie,
    
    // Popular movies
    popularMoviesList,
    currentPopularPage,
    isLoadingPopular,
    fetchPopularMovies,
    goToPopularPage,
    
    // Search functionality 
    searchList, 
    searchMovieList, 
    searchQuery,
    currentSearchPage,
    isLoadingMore,
    goToSearchPage,
    resetSearch
  }
})
