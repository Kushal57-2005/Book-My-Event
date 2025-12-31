import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Don't render Swiper until events are loaded
  if (events.length === 0) return null;

  return (
    <section className="HeroSection pt-20">
      <div className="w-full h-[calc(100vh-80px)]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          loopAdditionalSlides={5} // FIX LOOP WARNING
          className="h-full w-full"
          style={{
            "--swiper-navigation-color": "#FFFFFF",
            "--swiper-pagination-color": "#FFFFFF",
          }}
        >
          {events.slice(0, 5).map((event) => {
            const today = new Date();
            const date = new Date();

            // FIXED KEY NAME
            const offset = Number(event.daysFromNow || 0);
            date.setDate(today.getDate() + offset);

            const datePart = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            const finalDate = `${datePart} • ${event.time}`;

            return (
              <SwiperSlide key={event.id}>
                <div className="relative w-full h-full">
                  <img
                    src={event.img}
                    className="w-full h-full object-cover brightness-50"
                    alt={event.name}
                  />

                  <div className="absolute inset-0 flex flex-col justify-center text-white ml-20 space-y-3">
                    <h1 className="text-3xl md:text-6xl font-bold tracking-wide">
                      {event.name}
                    </h1>

                    <h3 className="text-lg md:text-3xl font-light tracking-wide">
                      {event.location}
                    </h3>

                    <p className="text-lg md:text-2xl">{finalDate}</p>

                    <button className="flex items-center gap-2 cursor-pointer group text-white w-fit">
                      <span className="text-lg">Watchlist</span>
                      <ArrowRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
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
