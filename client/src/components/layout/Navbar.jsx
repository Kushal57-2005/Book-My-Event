import { useState } from "react";
import Skeleton from "../common/Skeleton";
import { useWatchlist } from "../../useWatchlist.jsx";
import {
  HeartIcon,
  HomeIcon,
  FireIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { watchlist } = useWatchlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, loading, user } = useAuth();
  const isLogged = Boolean(user || localStorage.getItem("isLogged"));
  const isAdmin = user?.role === "admin";

  const links = [
    { id: "home", label: "Home", path: "/", icon: HomeIcon },
    { id: "trending", label: "Trending", path: "/trending", icon: FireIcon },
    {
      id: "watchlist",
      label: "Watchlist",
      path: "/watchlist",
      badge: watchlist.length,
      icon: HeartIcon,
    },
    {
      id: "bookings",
      label: "My Bookings",
      path: "/bookings",
      icon: BookOpenIcon,
      badge: 3,
    },
    ...(isAdmin
      ? [{ id: "admin", label: "Admin Panel", path: "/admin", icon: FireIcon }]
      : []),
  ];

  const activePath = window.location.pathname;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-stone-900/90 backdrop-blur-xl border-b border-stone-800/80 h-16 md:h-20 w-full flex items-center justify-between px-4 md:px-8 py-4 shadow-xl z-[999] fixed top-0 left-0">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-5 h-5 text-stone-950"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </div>
        <h2 className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-0.5">
          <span>Book</span>
          <span className="text-amber-400">My</span>
          <span className="text-stone-300">Event</span>
        </h2>
      </Link>

      {/* Desktop nav links */}
      <ul className="hidden md:flex items-center gap-1.5 bg-stone-800/60 p-1.5 rounded-full border border-stone-700/50">
        {links.map((link) => {
          const isActive = activePath === link.path;
          const Icon = link.icon;
          return (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20"
                    : "text-stone-300 hover:text-white hover:bg-stone-700/50"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-stone-950" : "text-stone-400"
                  }`}
                />
                {link.label}
                {link.badge > 0 && (
                  <span
                    className={`inline-flex items-center justify-center text-[10px] font-extrabold w-4.5 h-4.5 rounded-full leading-none ml-0.5 ${
                      isActive
                        ? "bg-stone-950 text-amber-300"
                        : "bg-amber-400 text-stone-950"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop auth buttons */}
      {loading ? (
        <Skeleton className="hidden md:block w-36 h-9 rounded-full bg-stone-800" />
      ) : isLogged ? (
        <button
          onClick={handleLogout}
          className="hidden md:block px-5 py-2 rounded-full text-xs font-bold text-stone-200 bg-stone-800/80 border border-stone-700 hover:bg-stone-700 transition-all duration-300"
        >
          Logout
        </button>
      ) : (
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full text-xs font-bold text-stone-200 border border-stone-700 hover:bg-stone-800 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-full text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all duration-300 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-2 rounded-xl text-stone-200 hover:bg-stone-800 transition-all duration-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-[998] md:hidden animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative bg-stone-900 border-b border-stone-800 shadow-2xl px-5 py-6 flex flex-col gap-2 animate-slideDown">
            {links.map((link) => {
              const isActive = activePath === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 text-stone-950 font-bold"
                      : "text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${
                      isActive ? "text-stone-950" : "text-stone-400"
                    }`}
                  />
                  {link.label}
                  {link.badge > 0 && (
                    <span
                      className={`inline-flex items-center justify-center text-[10px] font-extrabold w-5 h-5 rounded-full leading-none ml-auto ${
                        isActive
                          ? "bg-stone-950 text-amber-300"
                          : "bg-amber-400 text-stone-950"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            {loading ? (
              <Skeleton className="w-full h-10 rounded-xl bg-stone-800" />
            ) : isLogged ? (
              <button
                onClick={handleLogout}
                className="w-full mt-2 text-center px-4 py-3 rounded-xl text-sm font-bold text-stone-200 bg-stone-800 border border-stone-700"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3 mt-3 pt-3 border-t border-stone-800">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-stone-200 border border-stone-700 hover:bg-stone-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
