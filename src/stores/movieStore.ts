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
    
    if (page === 1) {
      // Reset search results for new query
      searchList.value = data;
    } else {
      // Append results for pagination
      searchList.value = {
        ...data,
        results: [...searchList.value.results, ...data.results]
      };
    }
    
    return data;
  }

  async function loadMoreSearchResults(): Promise<SearchResults | null> {
    if (isLoadingMore.value || currentSearchPage.value >= searchList.value.total_pages) {
      return null;
    }
    
    isLoadingMore.value = true;
    try {
      const nextPage = currentSearchPage.value + 1;
      const data = await searchMovieList(searchQuery.value, nextPage);
      return data;
    } finally {
      isLoadingMore.value = false;
    }
  }

  function resetSearch(): void {
    searchList.value = { page: 0, results: [], total_pages: 0, total_results: 0 };
    searchQuery.value = "";
    currentSearchPage.value = 1;
    isLoadingMore.value = false;
  }

  return {
    movieCache, 
    fetchMovie, 
    searchList, 
    searchMovieList, 
    searchQuery,
    currentSearchPage,
    isLoadingMore,
    loadMoreSearchResults,
    resetSearch
  }
})
