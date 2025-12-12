const apiKey = import.meta.env.VITE_API_URL;
const baseUrl = import.meta.env.VITE_BASE_URL;
const fetchHeaders = {
  headers: {
    Authorization: 'Bearer ' + apiKey, accept: 'application/json',
  },
}

export async function fetchPopularMovies(page: number) {
  const res = await fetch(`${baseUrl}/movie/popular?page=${page}`, fetchHeaders)
  if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`)
  return res.json()
}

export async function fetchMovieById(movie_id: number) {
  const res = await fetch(`${baseUrl}/movie/${movie_id}`, fetchHeaders)
  if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`)
  return res.json()
}

export async function searchMovie(query: string, page: number = 1) {
  const res = await fetch(`${baseUrl}/search/movie?query=${query}&language=en-US&page=${page}`, fetchHeaders)
  if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`)
  return res.json()
}
