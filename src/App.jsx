import { useState, useEffect } from "react";
import Home from "./components/pages/Home";
import Watchlist from "./components/pages/Watchlist";
import Trending from "./components/pages/Trending";
import MyBookings from "./components/pages/MyBookings";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function getPage() {
  const hash = window.location.hash.replace("#", "") || "home";
  return hash;
}

function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "trending":
        return <Trending />;
      case "watchlist":
        return <Watchlist />;
      case "bookings":
        return <MyBookings />;
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      default:
        return <Home />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
