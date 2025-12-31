import { useFavorites } from "../contexts/FavoritesContext";
import MovieRow from "../components/MovieRow";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main
      style={{
        padding: "3rem",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b, var(--bg-main))",
      }}
    >
      {/* ===== PAGE HEADER ===== */}
      <section
        style={{
          marginBottom: "3.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "800",
            letterSpacing: "-0.5px",
          }}
        >
          Your Favorites
        </h1>

        <p
          style={{
            maxWidth: "600px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          Movies you loved, saved forever. Your personal collection of
          unforgettable cinema moments.
        </p>
      </section>

      {/* ===== EMPTY STATE ===== */}
      {favorites.length === 0 && (
        <section
          className="glass"
          style={{
            padding: "4rem",
            borderRadius: "26px",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
            animation: "fadeUp 0.6s ease",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            🎬 Nothing here yet
          </h2>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            Start exploring movies and tap the  icon to build your
            personal watchlist.
          </p>
        </section>
      )}

      {/* ===== FAVORITES ROW ===== */}
      {favorites.length > 0 && (
        <section
          style={{
            animation: "fadeUp 0.6s ease",
          }}
        >
          <MovieRow
            title={` Saved Movies (${favorites.length})`}
            movies={favorites}
          />
        </section>
      )}
    </main>
  );
}

export default Favorites;
