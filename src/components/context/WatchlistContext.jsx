import { createContext, useContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

const STORAGE_KEY = "bme_watchlist";

function getStoredWatchlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(getStoredWatchlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (id) => {
    setWatchlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item !== id));
  };

  const isInWatchlist = (id) => watchlist.includes(id);

  const toggleWatchlist = (id) => {
    isInWatchlist(id) ? removeFromWatchlist(id) : addToWatchlist(id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

