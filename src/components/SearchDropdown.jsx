import { useState } from "react";
import { searchMovies } from "../services/movieApi";
import { Link } from "react-router-dom";

function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const movies = await searchMovies(value);
    setResults(movies.slice(0, 8));
    setLoading(false);
  }

  return (
    <div
      style={{
        position: "fixed",            // ✅ detach from navbar
        top: "96px",                   // ✅ moves it DOWN
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "700px",             // ✅ narrow & clean
        zIndex: 200,
        padding: "1.2rem",
        borderRadius: "22px",
        background: "rgba(15,23,42,0.75)",
        backdropFilter: "blur(22px)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.75)",
        border: "1px solid rgba(255,255,255,0.12)",
        animation: "fadeDown 0.35s ease",
      }}
    >
      {/* SEARCH INPUT */}
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search movies, actors, genres…"
        autoFocus
        style={{
          width: "100%",
          padding: "0.9rem 1.2rem",
          borderRadius: "14px",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          background: "rgba(255,255,255,0.08)",
          color: "var(--text-main)",
          marginBottom: "1rem",
        }}
      />

      {/* RESULTS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          maxHeight: "360px",
          overflowY: "auto",
        }}
      >
        {loading && (
          <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            Searching…
          </p>
        )}

        {!loading && results.length === 0 && query.length > 1 && (
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
            No results found
          </p>
        )}

        {results.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.9rem",
                padding: "0.6rem",
                borderRadius: "14px",
                alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)")
              }
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/60x90"
                }
                alt={movie.Title}
                style={{
                  width: "48px",
                  height: "72px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />

              <div>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    marginBottom: "2px",
                    color: "var(--text-main)",
                  }}
                >
                  {movie.Title}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.6,
                  }}
                >
                  {movie.Year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchDropdown;
