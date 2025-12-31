import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../services/movieApi";
import SimilarMovies from "../components/SimilarMovies";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Failed to load movie", err);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimate(true), 50);
      }
    }
    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Loading movie details… 🎬</h2>
      </main>
    );
  }

  if (!movie) {
    return (
      <main style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Movie not found 😕</h2>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          padding: "5rem 3rem",
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.8), var(--bg-main)),
            url(${movie.Poster})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            background: "rgba(0,0,0,0.55)",
            color: "white",
            backdropFilter: "blur(10px)",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* POSTER */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{
              width: "100%",
              borderRadius: "18px",
              boxShadow: "0 30px 90px rgba(0,0,0,0.7)",
              transform: animate ? "translateY(0)" : "translateY(40px)",
              opacity: animate ? 1 : 0,
              transition: "all 0.7s ease",
            }}
          />

          {/* INFO */}
          <div
            style={{
              transform: animate ? "translateY(0)" : "translateY(40px)",
              opacity: animate ? 1 : 0,
              transition: "all 0.8s ease",
            }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {movie.Title}
            </h1>

            <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
              {movie.Year} • {movie.Runtime} • {movie.Genre}
            </p>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.8rem" }}>
              <span className="glass" style={pillStyle}>
                ⭐ IMDb {movie.imdbRating}
              </span>
              <span className="glass" style={pillStyle}>
                🎭 {movie.Type?.toUpperCase()}
              </span>
              <span className="glass" style={pillStyle}>
                🔞 {movie.Rated}
              </span>
            </div>

            <p
              style={{
                maxWidth: "700px",
                lineHeight: 1.7,
                fontSize: "1.05rem",
                opacity: 0.9,
                marginBottom: "2.5rem",
              }}
            >
              {movie.Plot}
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button style={primaryBtn}>▶ Watch Trailer</button>
              <button style={secondaryBtn}>+ Add to Watchlist</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section
        style={{
          padding: "4rem 3rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        <Detail label="Director" value={movie.Director} />
        <Detail label="Writer" value={movie.Writer} />
        <Detail label="Actors" value={movie.Actors} />
        <Detail label="Language" value={movie.Language} />
        <Detail label="Country" value={movie.Country} />
        <Detail label="Awards" value={movie.Awards} />
        <Detail label="Box Office" value={movie.BoxOffice} />
        <Detail label="Production" value={movie.Production} />
      </section>

      {/* ================= SIMILAR MOVIES ================= */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem 4rem",
        }}
      >
        <SimilarMovies
          genre={movie.Genre}
          excludeId={movie.imdbID}
        />
      </section>
    </main>
  );
}

function Detail({ label, value }) {
  if (!value || value === "N/A") return null;

  return (
    <div className="glass" style={{ padding: "1.2rem" }}>
      <h4 style={{ marginBottom: "0.4rem", opacity: 0.7 }}>
        {label}
      </h4>
      <p style={{ lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

const pillStyle = {
  padding: "0.4rem 0.9rem",
  borderRadius: "999px",
  fontSize: "0.9rem",
};

const primaryBtn = {
  padding: "0.9rem 2rem",
  borderRadius: "999px",
  border: "none",
  fontWeight: "700",
  cursor: "pointer",
  background:
    "linear-gradient(135deg, var(--accent), var(--accent-2))",
  color: "#020617",
};

const secondaryBtn = {
  padding: "0.9rem 2rem",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.25)",
  background: "transparent",
  color: "var(--text-main)",
  cursor: "pointer",
};

export default MovieDetails;
