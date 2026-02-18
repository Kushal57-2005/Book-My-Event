import Button from "../common/Button";
import { useWatchlist } from "../context/useWatchlist";
import { HeartIcon, HomeIcon, FireIcon, BookOpenIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { watchlist } = useWatchlist();
  const hash = window.location.hash.replace("#", "") || "home";

  const links = [
    { id: "home", label: "Home", hash: "home", icon: HomeIcon },
    { id: "trending", label: "Trending", hash: "trending", icon: FireIcon },
    { id: "watchlist", label: "Watchlist", hash: "watchlist", badge: watchlist.length, icon: HeartIcon },
    { id: "bookings", label: "My Bookings", hash: "bookings", icon: BookOpenIcon, badge: 3 },
  ];

  const activeId = hash === "home" || hash === "" ? "home" : hash;

  return (
    <nav className="bg-white/72 backdrop-blur-xl backdrop-saturate-[1.8] h-20 w-full flex items-center justify-between px-8 py-4 shadow-[0_1px_20px_rgba(124,58,237,0.08)] z-999 fixed border-b border-white/40">
      <a href="#home" className="flex items-center gap-2.5">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-300/30">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">Book</span>
          <span className="text-gray-800">My</span>
          <span className="text-gray-800">Event</span>
        </h2>
      </a>
      <ul className="flex gap-1">
        {links.map((link) => {
          const isActive = link.id === activeId;
          const Icon = link.icon;
          return (
            <li key={link.id}>
              <a
                href={`#${link.hash}`}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                    : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-purple-200" : "text-purple-400"}`}
                />
                {link.label}
                {link.badge > 0 && (
                  <span
                    className={`inline-flex items-center justify-center text-[10px] font-bold w-5 h-5 rounded-full leading-none ml-0.5 ${
                      isActive
                        ? "bg-white text-purple-700"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-3">
        <a href="#login" className="px-5 py-2 rounded-full text-sm font-semibold text-purple-700 border border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300">
          Login
        </a>
        <a href="#register" className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-500 shadow-md shadow-purple-300/30 hover:shadow-purple-400/40 hover:from-purple-700 hover:to-violet-600 transition-all duration-300 active:scale-95">
          Sign up
        </a>
      </div>
    </nav>
  );
}
