import { useEffect, useState } from "react";
import { getSimilarMovies } from "../services/movieApi";
import MovieCard from "./MovieCard";

function SimilarMovies({ genre, excludeId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getSimilarMovies(genre);

        // clean + remove current movie
        const filtered = res.filter(
          (m) =>
            m?.imdbID &&
            m.imdbID !== excludeId &&
            m.Poster &&
            m.Poster !== "N/A"
        );

        setMovies(filtered.slice(0, 10));
      } catch (err) {
        console.error("Failed to load similar movies", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [genre, excludeId]);

  if (loading || movies.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "4rem",
      }}
    >
      <h2 className="section-title">🎞 Similar Movies</h2>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          paddingBottom: "1rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default SimilarMovies;
