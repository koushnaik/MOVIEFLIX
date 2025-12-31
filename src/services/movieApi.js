import axios from "axios";

const API_KEY = "97ebbba3";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  const res = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, s: query }
  });
  return res.data.Search || [];
}

export async function getMovieById(id) {
  const res = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, i: id, plot: "full" }
  });
  return res.data;
}

/* =========================
   🔥 NEW: Similar Movies
   We fake "similar" by genre keyword
   ========================= */
export async function getSimilarMovies(genre) {
  if (!genre) return [];

  // take first genre only (OMDb limitation)
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
