import { searchMovies } from "./movieApi";

const TRENDING_QUERIES = [
  "Avengers",
  "Batman",
  "Spider",
  "Mission Impossible",
  "Fast",
  "Star Wars",
  "Harry Potter",
];

export async function getTrendingMovies() {
  const results = await Promise.all(
    TRENDING_QUERIES.map((q) => searchMovies(q))
  );

  // flatten + remove duplicates
  const map = new Map();

  results.flat().forEach((movie) => {
    if (movie?.imdbID) {
      map.set(movie.imdbID, movie);
    }
  });

  return Array.from(map.values());
}
