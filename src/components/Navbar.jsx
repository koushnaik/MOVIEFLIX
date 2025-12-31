import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import SearchDropdown from "./SearchDropdown";

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(18px)",
        background:
          "linear-gradient(180deg, rgba(10,10,10,0.92), rgba(10,10,10,0.78))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          height: "78px",
          padding: "0 2.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            position: "relative",
          }}
        >
          {/* RED CINEMATIC GLOW */}
          <div
            style={{
              position: "absolute",
              inset: "-26px",
              background:
                "radial-gradient(circle at left, rgba(49, 36, 36, 0.65), transparent 70%)",
              filter: "blur(34px)",
              zIndex: -1,
            }}
          />

          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: "900",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily:
                "'Oswald','Montserrat','Inter',system-ui,sans-serif",
              background:
                "linear-gradient(180deg, #ff0000ff, #ff0000ff, #ff0000ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 10px 50px rgba(220,38,38,0.7)",
            }}
          >
            MovieFlix
          </h1>
        </Link>

        {/* ================= ACTIONS ================= */}
        <div
          style={{
            display: "flex",
            gap: "1.2rem",
            alignItems: "center",
          }}
        >
          {/* FAVORITES */}
          <Link to="/favorites">
            <IconButton>
              FAVORITES
              {favorites.length > 0 && (
                <Badge>{favorites.length}</Badge>
              )}
            </IconButton>
          </Link>

          {/* SEARCH */}
          <IconButton onClick={() => setOpen(!open)}>
            SEARCH
          </IconButton>

          {/* THEME TOGGLE */}
          <IconButton
            accent
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? "⚪️" : "⚫️"}
          </IconButton>
        </div>
      </div>

      {/* ================= SEARCH DROPDOWN ================= */}
      {open && <SearchDropdown />}
    </nav>
  );
}

/* =======================
   REUSABLE UI COMPONENTS
   ======================= */

function IconButton({ children, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        minWidth: "110px",
        height: "48px",
        padding: "0 18px",
        borderRadius: "999px",
        border: accent
          ? "none"
          : "1px solid rgba(255,255,255,0.15)",
        background: accent
          ? "linear-gradient(135deg, #dc2626, #991b1b)"
          : "rgba(255,255,255,0.06)",
        color: accent ? "#ffffff" : "var(--text-main)",
        fontSize: "0.72rem",
        fontWeight: "800",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.55)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-2px) scale(1.06)";
        e.currentTarget.style.boxShadow =
          "0 18px 55px rgba(220,38,38,0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 12px 35px rgba(0,0,0,0.55)";
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children }) {
  return (
    <span
      style={{
        position: "absolute",
        top: "-6px",
        right: "-6px",
        minWidth: "18px",
        height: "18px",
        padding: "0 6px",
        borderRadius: "999px",
        background:
          "linear-gradient(135deg, #dc2626, #991b1b)",
        color: "white",
        fontSize: "0.6rem",
        fontWeight: "900",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 14px rgba(220,38,38,0.85)",
      }}
    >
      {children}
    </span>
  );
}

export default Navbar;
