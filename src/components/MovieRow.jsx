import { useRef } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (dir) => {
    if (!rowRef.current) return;

    const amount =
      dir === "left"
        ? -rowRef.current.offsetWidth * 0.8
        : rowRef.current.offsetWidth * 0.8;

    rowRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="section"
      style={{
        position: "relative",
      }}
    >
      {/* ===== TITLE ===== */}
      <h2
        className="section-title"
        style={{
          marginBottom: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{title}</span>
      </h2>

      {/* ===== LEFT ARROW ===== */}
      <Arrow direction="left" onClick={() => scroll("left")} />

      {/* ===== MOVIE STRIP ===== */}
      <div
        ref={rowRef}
        style={{
          display: "flex",
          gap: "1.6rem",
          overflowX: "auto",
          paddingBottom: "1.2rem",
          paddingInline: "0.3rem",
          scrollBehavior: "smooth",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* ===== RIGHT ARROW ===== */}
      <Arrow direction="right" onClick={() => scroll("right")} />
    </section>
  );
}

/* =====================
   SUB COMPONENTS
   ===================== */

function Arrow({ direction, onClick }) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [isLeft ? "left" : "right"]: "-18px",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        zIndex: 10,
        background:
          "linear-gradient(135deg, var(--accent), var(--accent-2))",
        color: "#020617",
        fontSize: "1.1rem",
        fontWeight: "900",
        boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-50%) scale(1.12)";
        e.currentTarget.style.boxShadow =
          "0 18px 50px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(-50%) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 12px 35px rgba(0,0,0,0.45)";
      }}
    >
      {isLeft ? "‹" : "›"}
    </button>
  );
}

export default MovieRow;
