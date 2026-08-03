import { useEffect, useState } from "react";
import { useWatchlist } from "../../useWatchlist";
import EventDetails from "../events/EventDetails";
import Navbar from "../layout/Navbar";
import {
  HeartIcon,
  TrashIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import EventCardSkeleton from "../events/EventCardSkeleton";
import Card3D from "../common/Card3D";
import { getEventsApi } from "../../api/events";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCard, setOpenCard] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    getEventsApi().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const watchlistEvents = events.filter((e) => watchlist.includes(e.id));

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromWatchlist(id);
      setRemovingId(null);
    }, 300);
  };

  const getEventDate = (event) => {
    const today = new Date();
    const date = new Date();
    const offset = Number(event.daysFromNow || 0);
    date.setDate(today.getDate() + offset);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#fbfbf9] pt-24 md:pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-stone-900 border border-stone-800 p-2.5 sm:p-3 rounded-2xl shadow-md">
              <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Saved Watchlist
              </h1>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                {watchlistEvents.length === 0
                  ? "Save events you're interested in"
                  : `${watchlistEvents.length} event${watchlistEvents.length > 1 ? "s" : ""} saved in watchlist`}
              </p>
            </div>
          </div>
          <div className="mt-4 h-1 w-20 bg-amber-400 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array(4).fill(0).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : watchlistEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center">
                  <HeartOutline className="w-10 h-10 text-stone-400" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-stone-800 mb-2">
                Your watchlist is currently empty
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                Explore available events and save your favorite passes here for quick access.
              </p>

              <a
                href="/"
                className="inline-flex items-center gap-2 bg-stone-900 text-amber-300 border border-stone-800 px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:bg-stone-800 transition-all duration-300 active:scale-95"
              >
                <TicketIcon className="w-4 h-4" />
                Explore Event Catalog
              </a>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {watchlistEvents.map((event) => {
                const datePart = getEventDate(event);
                const isRemoving = removingId === event.id;

                return (
                  <Card3D key={event.id} className="w-full">
                    <div
                      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-stone-200/80 ${
                        isRemoving
                          ? "opacity-0 scale-95 translate-x-4"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      <div
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={() => setOpenCard(event)}
                      >
                        <img
                          src={event.img}
                          alt={event.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                        <span className="absolute top-3 left-3 bg-stone-900/90 border border-stone-700/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {event.type}
                        </span>
                        <div className="absolute top-3 right-3 bg-amber-400 p-2 rounded-full shadow-md text-stone-950">
                          <HeartIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 bg-stone-50/40">
                        <h3
                          className="font-bold text-base text-stone-900 mb-2 leading-snug cursor-pointer hover:text-amber-600 transition-colors line-clamp-1"
                          onClick={() => setOpenCard(event)}
                        >
                          {event.name}
                        </h3>

                        <div className="space-y-2 text-xs text-stone-600 mb-4 font-medium">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>
                              {datePart} • {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CurrencyRupeeIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span className="font-bold text-stone-900">
                              {event.isPaid ? `₹${event.price}` : "Free"}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            className="flex-1 bg-stone-900 text-amber-300 border border-stone-800 py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-stone-800 transition-all duration-300 shadow-sm active:scale-95"
                            onClick={() => setOpenCard(event)}
                          >
                            View Pass
                          </button>

                          <button
                            className="flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-600 p-2.5 rounded-xl hover:bg-rose-100 transition-all duration-300 active:scale-90"
                            onClick={() => handleRemove(event.id)}
                            title="Remove from watchlist"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {openCard && (
        <EventDetails event={openCard} onClose={() => setOpenCard(null)} />
      )}
    </>
  );
}
