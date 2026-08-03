export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { label: "All Events", href: "/" },
      { label: "Trending", href: "/trending" },
      { label: "Watchlist", href: "/watchlist" },
      { label: "My Bookings", href: "/bookings" },
    ],
    categories: [
      { label: "Music", href: "/" },
      { label: "Education", href: "/" },
      { label: "Cultural", href: "/" },
      { label: "Entertainment", href: "/" },
      { label: "Spiritual", href: "/" },
    ],
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center text-stone-950 font-black text-sm shadow-md shadow-amber-400/20">
                B
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Book<span className="text-amber-400">My</span>Event
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-400 max-w-sm">
              Discover, save, and reserve access for premium events happening across India.
              Minimalist design, seamless ticket discovery.
            </p>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {links.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-stone-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-widest mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {links.categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-stone-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {currentYear} BookMyEvent. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with minimalist precision
          </p>
        </div>
      </div>
    </footer>
  );
}
