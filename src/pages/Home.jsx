import { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import MovieRow from "../components/MovieRow";
import Loader from "../components/Loader";
import { getMovieById } from "../services/movieApi";

/* =========================
   CURATED MOVIE IDS
   ========================= */

const HERO_IDS = [
  "tt0816692", // Interstellar
  "tt1375666", // Inception
  "tt0133093", // The Matrix
  "tt0468569", // The Dark Knight
  "tt6751668", // Parasite
  "tt0110912", // Pulp Fiction
  "tt0167260", // LOTR: ROTK
  "tt0120689", // Green Mile
  "tt0114369", // Se7en
  "tt0109830", // Forrest Gump
];

const SCIFI_IDS = [
  "tt0062622",
  "tt0083658",
  "tt1856101",
  "tt2543164",
  "tt1160419",
  "tt0470752",
  "tt0181689",
  "tt0209144",
  "tt0499549",
  "tt0120737",
];

const ACTION_IDS = [
  "tt2911666",
  "tt1392190",
  "tt0172495",
  "tt0095016",
  "tt1745960",
  "tt0372784",
  "tt1877830",
  "tt1345836",
  "tt0103064",
  "tt4154756",
];

const MARVEL_IDS = [
  "tt0371746",
  "tt0848228",
  "tt2395427",
  "tt4154796",
  "tt3501632",
  "tt1825683",
  "tt2250912",
  "tt1300854",
  "tt0800369",
  "tt4154664",
];

function Home() {
  const [hero, setHero] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [action, setAction] = useState([]);
  const [marvel, setMarvel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const load = (ids) =>
          Promise.all(ids.map((id) => getMovieById(id)));

        const [h, s, a, m] = await Promise.all([
          load(HERO_IDS),
          load(SCIFI_IDS),
          load(ACTION_IDS),
          load(MARVEL_IDS),
        ]);

        setHero(h);
        setScifi(s);
        setAction(a);
        setMarvel(m);
      } catch (err) {
        console.error("Failed to load movies", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  /* =========================
     LOADING STATE
     ========================= */
  if (loading) {
    return (
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.6rem",
          textAlign: "center",
        }}
      >
        <Loader size={64} />
        <p
          style={{
            fontSize: "1rem",
            opacity: 0.75,
            maxWidth: "420px",
            lineHeight: 1.6,
          }}
        >
          Curating cinema.
          <br />
          Loading hand-picked masterpieces.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        /* 🔥 THIS FIXES THE "HOMEPAGE NOT COMING" ISSUE */
        paddingTop: "96px", // navbar height + spacing
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        paddingBottom: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* ================= HERO ================= */}
      <section>
        <HeroCarousel movies={hero} />
      </section>

      {/* ================= SCI-FI ================= */}
      <section className="section">
        <MovieRow
          title="SCI-FI AND MIND-BENDERS"
          movies={scifi}
        />
      </section>

      {/* ================= ACTION ================= */}
      <section className="section">
        <MovieRow
          title="ACTION AND ADRENALINE"
          movies={action}
        />
      </section>

      {/* ================= MARVEL ================= */}
      <section className="section">
        <MovieRow
          title="MARVEL CINEMATIC UNIVERSE"
          movies={marvel}
        />
      </section>

      {/* ================= GRAND FINALE ================= */}
      <section
        style={{
          padding: "3.5rem 3rem",
          borderRadius: "28px",
          background:
            "linear-gradient(135deg, var(--bg-soft), var(--bg-main))",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            marginBottom: "1.2rem",
            letterSpacing: "0.5px",
          }}
        >
          CINEMA, CURATED
        </h2>

        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            lineHeight: 1.7,
            opacity: 0.75,
            fontSize: "1.05rem",
          }}
        >
          Hand-picked movies across genres.
          <br />
          No broken posters. No random junk.
          <br />
          Just pure cinema — designed, filtered, and polished.
        </p>
      </section>
    </main>
  );
}

export default Home;
