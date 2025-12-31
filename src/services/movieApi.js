import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

if (!API_KEY) {
  console.error("❌ OMDB API KEY IS MISSING");
}

export async function searchMovies(query) {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });

  return res.data.Search || [];
}

export async function getMovieById(id) {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  });

  return res.data;
}

export async function getSimilarMovies(genre) {
  if (!genre) return [];

  const keyword = genre.split(",")[0];

  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: keyword,
      type: "movie",
    },
  });

  return res.data.Search || [];
}
