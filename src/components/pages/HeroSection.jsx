import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { HeartIcon as HeartSolid, MapPinIcon, CalendarDaysIcon, TicketIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useEffect, useState } from "react";
import { useWatchlist } from "../context/useWatchlist";

export default function HeroSection() {
  const [events, setEvents] = useState([]);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="HeroSection pt-20">
      <div className="w-full h-[calc(100vh-80px)]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          loopAdditionalSlides={5}
          className="h-full w-full"
          style={{
            "--swiper-navigation-color": "#FFFFFF",
            "--swiper-pagination-color": "#FFFFFF",
          }}
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
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={event.img}
                    className="w-full h-full object-cover scale-105"
                    alt={event.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24 space-y-5 max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit border border-white/20">
                      <TicketIcon className="w-3.5 h-3.5" />
                      {event.type}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] drop-shadow-lg">
                      {event.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-white/80">
                      <span className="inline-flex items-center gap-1.5 text-sm sm:text-base">
                        <MapPinIcon className="w-4 h-4 text-purple-300" />
                        {event.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="inline-flex items-center gap-1.5 text-sm sm:text-base">
                        <CalendarDaysIcon className="w-4 h-4 text-purple-300" />
                        {finalDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {event.isPaid ? (
                        <span className="bg-gradient-to-r from-purple-600 to-violet-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-600/30">
                          ₹{event.price}
                        </span>
                      ) : (
                        <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-600/30">
                          Free Entry
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href="#events"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-7 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl active:scale-95"
                      >
                        Explore Events
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>

                      <button
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all duration-300 active:scale-95 ${
                          saved
                            ? "bg-pink-500/20 border-pink-400/50 text-pink-300 hover:bg-pink-500/30"
                            : "bg-white/10 border-white/25 text-white hover:bg-white/20 hover:border-white/40"
                        }`}
                        onClick={() => toggleWatchlist(event.id)}
                      >
                        {saved ? (
                          <HeartSolid className="w-4 h-4 text-pink-400" />
                        ) : (
                          <HeartOutline className="w-4 h-4" />
                        )}
                        {saved ? "Saved" : "Watchlist"}
                      </button>
                    </div>
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
