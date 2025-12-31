import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 🔁 Load from localStorage on start
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // 💾 Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ➕ Add
  function addFavorite(movie) {
    setFavorites((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  }

  // ➖ Remove
  function removeFavorite(id) {
    setFavorites((prev) =>
      prev.filter((movie) => movie.imdbID !== id)
    );
  }

  // ⭐ Check
  function isFavorite(id) {
    return favorites.some((movie) => movie.imdbID === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// 🔌 Hook
export function useFavorites() {
  return useContext(FavoritesContext);
}
