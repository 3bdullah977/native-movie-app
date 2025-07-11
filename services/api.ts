export const TMDB_CONFIG ={
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
}
// Popular Movies
export const fetchPopularMovies = async ({query} : {query: string}) => {
  const endpoint = query ? 
  `${TMDB_CONFIG.BASE_URL}/search/movie?query=${query}` :
  `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data.results;
}
// Top Rated
export const fetchTopRatedMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/top_rated?language=en-US&page=1`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data.results;
}
// Movies Data
export const fetchMovieData = async (id: string) : Promise<MovieDetails> => {
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}`;

    const response = await fetch(endpoint,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
  
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}