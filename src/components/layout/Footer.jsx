import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { label: "All Events", href: "#home" },
      { label: "Trending", href: "#home" },
      { label: "Watchlist", href: "#watchlist" },
      { label: "My Bookings", href: "#home" },
    ],
    categories: [
      { label: "Music", href: "#home" },
      { label: "Education", href: "#home" },
      { label: "Cultural", href: "#home" },
      { label: "Entertainment", href: "#home" },
      { label: "Spiritual", href: "#home" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                BookMyEvent
              </h3>
            </a>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Discover, save, and book the best events happening across India.
              From concerts to workshops — your next unforgettable experience
              starts here.
            </p>
            <div className="flex gap-4">
              {["X", "In", "Ig", "Yt"].map((label) => (
                <button
                  key={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xs font-bold hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {links.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {links.categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} BookMyEvent. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with{" "}
            <HeartIcon className="w-3.5 h-3.5 text-purple-500 inline" /> by
            Kushal Waykole
          </p>
        </div>
      </div>
    </footer>
  );
}
