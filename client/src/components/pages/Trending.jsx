import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import EventsCard from "../events/EventsCard";
import EventCardSkeleton from "../events/EventCardSkeleton";
import { FireIcon } from "@heroicons/react/24/solid";
import { getEventsApi } from "../../api/events";

export default function Trending() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventsApi().then((data) => {
      const upcoming = [...data]
        .filter((e) => Number(e.daysFromNow ?? 999) <= 6 && e.seatAvailable > 0)
        .sort((a, b) => Number(a.daysFromNow) - Number(b.daysFromNow))
        .slice(0, 8);
      setEvents(upcoming);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 min-h-screen bg-[#fbfbf9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              <FireIcon className="w-3.5 h-3.5" />
              High Demand Pass Access
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-3">
              Trending <span className="text-amber-600">Events</span>
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Discover high-demand events happening across major cities in India.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
              {Array(6).fill(0).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 border border-stone-200">
                <FireIcon className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-1">
                No trending events found currently.
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
