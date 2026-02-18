import { useEffect, useState } from "react";
import { useWatchlist } from "../context/useWatchlist";
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

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [events, setEvents] = useState([]);
  const [openCard, setOpenCard] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
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

      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-100 pt-28 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-3 rounded-2xl shadow-lg shadow-purple-300/40">
              <HeartIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                My Watchlist
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {watchlistEvents.length === 0
                  ? "Save events you're interested in"
                  : `${watchlistEvents.length} event${watchlistEvents.length > 1 ? "s" : ""} saved`}
              </p>
            </div>
          </div>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto">
          {watchlistEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 bg-purple-100 rounded-full flex items-center justify-center">
                  <HeartOutline className="w-14 h-14 text-purple-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <TicketIcon className="w-5 h-5 text-purple-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your watchlist is empty
              </h2>
              <p className="text-gray-500 max-w-md mb-6 leading-relaxed">
                Explore events and click{" "}
                <span className="text-purple-600 font-semibold">
                  "Add to Wishlist"
                </span>{" "}
                to save them here for later.
              </p>

              <a
                href="#home"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-300/40 hover:shadow-purple-400/50 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <TicketIcon className="w-5 h-5" />
                Browse Events
              </a>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {watchlistEvents.map((event) => {
                const datePart = getEventDate(event);
                const isRemoving = removingId === event.id;

                return (
                  <div
                    key={event.id}
                    className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 ${
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
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {event.type}
                      </span>
                      <div className="absolute top-3 right-3 bg-purple-600 p-2 rounded-full shadow-lg">
                        <HeartIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3
                        className="font-bold text-lg text-gray-900 mb-2 leading-snug cursor-pointer hover:text-purple-700 transition-colors line-clamp-1"
                        onClick={() => setOpenCard(event)}
                      >
                        {event.name}
                      </h3>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDaysIcon className="w-4 h-4 text-purple-500 shrink-0" />
                          <span>
                            {datePart} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CurrencyRupeeIcon className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="font-semibold text-gray-800">
                            {event.isPaid ? `₹${event.price}` : "Free"}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        {event.seatAvailable > 0 ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                event.seatAvailable > 50
                                  ? "bg-green-500"
                                  : event.seatAvailable > 10
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="text-xs text-gray-500">
                              {event.seatAvailable} seats left
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-xs text-red-600 font-medium">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md shadow-purple-200/50 active:scale-95"
                          onClick={() => setOpenCard(event)}
                        >
                          View Details
                        </button>

                        <button
                          className="flex items-center justify-center bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all duration-300 active:scale-90 group/remove"
                          onClick={() => handleRemove(event.id)}
                          title="Remove from watchlist"
                        >
                          <TrashIcon className="w-5 h-5 transition-transform group-hover/remove:scale-110" />
                        </button>
                      </div>
                    </div>
                  </div>
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
