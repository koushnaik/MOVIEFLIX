import { useEffect, useState } from "react";

function HeroCarousel({ movies }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState("next");

  if (!movies || movies.length === 0) return null;

  const movie = movies[index];

  // ===== AUTO SLIDE =====
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setDirection("next");
      setIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [movies.length, paused]);

  // ===== NAV ACTIONS =====
  const goNext = () => {
    setDirection("next");
    setIndex((prev) => (prev + 1) % movies.length);
    setPaused(true);
  };

  const goPrev = () => {
    setDirection("prev");
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setPaused(true);
  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1.25fr 0.75fr", // ✅ safer ratio
        gap: "2.5rem",
        padding: "3rem",
        marginBottom: "2.5rem",
        borderRadius: "26px",
        background:
          "linear-gradient(135deg, var(--bg-soft), var(--bg-main))",
        minHeight: "460px",
        position: "relative",
        overflow: "hidden", // ✅ CLIPS EVERYTHING
      }}
    >
      {/* ===== LEFT: TEXT ===== */}
      <div
        key={movie.imdbID}
        style={{
          animation:
            direction === "next"
              ? "slideFromRight 0.6s ease"
              : "slideFromLeft 0.6s ease",
        }}
      >
        <h1 style={{ fontSize: "3.2rem", marginBottom: "1rem" }}>
          {movie.Title}
        </h1>

        <p style={{ color: "var(--text-muted)", marginBottom: "1.2rem" }}>
          {movie.Year} • {movie.Type?.toUpperCase()}
        </p>

        <p
          style={{
            maxWidth: "520px",
            lineHeight: 1.6,
            marginBottom: "2.2rem",
          }}
        >
          One of the most talked-about movies right now. Discover
          trending titles curated specially for you.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              padding: "0.9rem 2rem",
              borderRadius: "999px",
              border: "none",
              fontWeight: "700",
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#020617",
              cursor: "pointer",
            }}
          >
            ▶ Watch Details
          </button>

          <button
            style={{
              padding: "0.9rem 2rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "var(--text-main)",
              cursor: "pointer",
            }}
          >
            + My List
          </button>
        </div>
      </div>

      {/* ===== RIGHT: POSTER (CONTAINED) ===== */}
      <div
        key={movie.Poster}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "100%",
          animation:
            direction === "next"
              ? "slideFromRight 0.6s ease"
              : "slideFromLeft 0.6s ease",
        }}
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={{
            width: "100%",
            maxWidth: "280px", // ✅ prevents overflow
            height: "auto",
            borderRadius: "18px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)", // ✅ softer
          }}
        />
      </div>

      {/* ===== DOTS ===== */}
      <div
        style={{
          position: "absolute",
          bottom: "22px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.6rem",
          zIndex: 4,
        }}
      >
        {movies.slice(0, 6).map((_, i) => (
          <span
            key={i}
            onClick={() => {
              setDirection(i > index ? "next" : "prev");
              setIndex(i);
              setPaused(true);
            }}
            style={{
              width: i === index ? "22px" : "8px",
              height: "8px",
              borderRadius: "999px",
              cursor: "pointer",
              background:
                i === index
                  ? "linear-gradient(135deg, var(--accent), var(--accent-2))"
                  : "rgba(255,255,255,0.3)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ===== INVISIBLE CLICK ZONES ===== */}
      <div
        onClick={goPrev}
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: "20%",
          cursor: "w-resize",
          zIndex: 3,
        }}
      />

      <div
        onClick={goNext}
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: "20%",
          cursor: "e-resize",
          zIndex: 3,
        }}
      />
    </section>
  );
}

export default HeroCarousel;
