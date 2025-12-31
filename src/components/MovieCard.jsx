import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext"; // ⭐ ADD

function MovieCard({ movie }) {
  if (!movie) return null;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);

  return (
    <div
      className="glass"
      style={{
        width: "200px",
        flexShrink: 0,
        overflow: "hidden",
        transition: "transform 0.3s",
        position: "relative",
      }}
    >
      {/* POSTER */}
      <div style={{ position: "relative" }}>
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
        />

        {/* ⭐ FAVORITE ICON */}
        <button
          onClick={() =>
            fav ? removeFavorite(movie.imdbID) : addFavorite(movie)
          }
          title={fav ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            cursor: "pointer",
            fontSize: "1.1rem",
            background: fav
              ? "linear-gradient(135deg, #f43f5e, #fb7185)"
              : "rgba(0,0,0,0.55)",
            color: "white",
            backdropFilter: "blur(6px)",
          }}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "0.8rem" }}>
        <h4 style={{ fontSize: "0.95rem", marginBottom: "0.2rem" }}>
          {movie.Title}
        </h4>

        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          {movie.Year}
        </p>

        {/* VIEW DETAILS */}
        <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.45rem",
              borderRadius: "8px",
              border: "none",
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#020617",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
