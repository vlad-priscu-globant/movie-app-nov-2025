export interface SearchResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  release_date: Date;
  poster_path: string;
  popularity: number;
  title: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: string[]
  overview?: string;
}
export interface SearchResults {
  page: number;
  results: SearchResult[] | [];
  total_pages: number;
  total_results: number;
}