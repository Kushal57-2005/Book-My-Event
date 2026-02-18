import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import EventsCard from "../events/EventsCard";
import { FireIcon } from "@heroicons/react/24/solid";

export default function Trending() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        // Show events happening within the next 6 days, soonest first, exclude sold-out
        const upcoming = [...data]
          .filter((e) => Number(e.daysFromNow ?? 999) <= 6 && e.seatAvailable > 0)
          .sort((a, b) => Number(a.daysFromNow) - Number(b.daysFromNow))
          .slice(0, 8);
        setEvents(upcoming);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-8 min-h-screen bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <FireIcon className="w-3.5 h-3.5" />
              Hot Right Now
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Trending{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              The most popular events everyone's talking about — filling up fast!
            </p>
          </div>
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Loading trending events...
              </h3>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
              {events.map((event) => (
                <EventsCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
