import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import { useWatchlist } from "../../useWatchlist";
import ThreeHeroCanvas from "../common/ThreeHeroCanvas";
import { getEventsApi } from "../../api/events";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const [events, setEvents] = useState([]);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    getEventsApi()
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="HeroSection pt-24 md:pt-28 pb-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={events.length > 1}
          className="w-full"
        >
          {events.slice(0, 5).map((event) => {
            const today = new Date();
            const date = new Date();
            const offset = Number(event.daysFromNow || 0);
            date.setDate(today.getDate() + offset);

            const datePart = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            const finalDate = `${datePart} • ${event.time}`;
            const saved = isInWatchlist(event.id);

            return (
              <SwiperSlide key={event.id}>
                <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] overflow-hidden">
                  {/* Background Ambient Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-800/80 via-stone-900 to-black z-0" />
                  
                  {/* Background Image Layer with Subtle Blend */}
                  <img
                    src={event.img}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105 z-0"
                  />
                  
                  {/* Left Column: Event Details Minimalist Content */}
                  <div className="relative z-10 lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 lg:p-14 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 text-amber-300">
                        {event.type}
                      </span>
                      <span className="text-xs text-stone-400 font-medium tracking-wide">
                        {finalDate}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                      {event.name}
                    </h1>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl line-clamp-2">
                      {event.info}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300 font-medium">
                      <span className="flex items-center gap-2 bg-stone-800/80 border border-stone-700/60 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </span>

                      {event.isPaid ? (
                        <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold px-4 py-1.5 rounded-lg">
                          ₹{event.price}
                        </span>
                      ) : (
                        <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold px-4 py-1.5 rounded-lg">
                          Free Access
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="#events"
                        className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-400/10 active:scale-95 flex items-center gap-2"
                      >
                        Explore Tickets
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>

                      <button
                        onClick={() => toggleWatchlist(event.id)}
                        className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 active:scale-95 flex items-center gap-2 ${
                          saved
                            ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                            : "bg-stone-800/80 border-stone-700/80 text-stone-200 hover:bg-stone-700/80"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 ${saved ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {saved ? "Saved to Watchlist" : "Add to Watchlist"}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive 3D Canvas Stage */}
                  <div className="relative z-10 lg:col-span-5 h-[340px] lg:h-full flex items-center justify-center p-4">
                    <ThreeHeroCanvas activeEvent={event} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

