import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem("bme_watchlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bme_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((i) => i !== id));
  };

  const isInWatchlist = (id) => watchlist.includes(id);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, toggleWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
