import { useState, useRef } from "react";
import { useWatchlist } from "../context/useWatchlist";
import {
  XMarkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UsersIcon,
  HeartIcon as HeartSolid,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import SeatSelection from "./SeatSelection";

export default function EventDetails({ event, onClose }) {
  const [showSeats, setShowSeats] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const justClosedSeats = useRef(false);

  if (!event) return null;

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
  const seatsAvailable = Number(event.seatAvailable ?? 0);
  const saved = isInWatchlist(event.id);

  const seatsFilled = event.seatCount ? event.seatCount - seatsAvailable : 0;
  const filledPercent = event.seatCount
    ? Math.round((seatsFilled / event.seatCount) * 100)
    : 0;

  const handleBackFromSeats = () => {
    justClosedSeats.current = true;
    setShowSeats(false);
    setTimeout(() => { justClosedSeats.current = false; }, 300);
  };

  const handleBackdropClose = () => {
    if (justClosedSeats.current) return;
    onClose();
  };

  if (showSeats) {
    return (
      <SeatSelection
        event={event}
        onClose={onClose}
        onBack={handleBackFromSeats}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-9999 p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleBackdropClose}
      />
      <div className="relative bg-white w-full max-w-[420px] rounded-2xl shadow-2xl animate-scaleIn z-50 overflow-hidden">
        <button
          className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full p-1.5 transition-all duration-300"
          onClick={onClose}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <div className="relative h-56 overflow-hidden">
          <img
            src={event.img}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
              {event.type}
            </span>

            {event.isPaid ? (
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                ₹{event.price}
              </span>
            ) : (
              <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                Free
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
            {event.name}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {event.info}
          </p>
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <MapPinIcon className="w-4 h-4 text-purple-500" />
              </div>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <CalendarDaysIcon className="w-4 h-4 text-purple-500" />
              </div>
              <span>{finalDate}</span>
            </div>
          </div>
          <div className="mb-5 bg-gray-50 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <UsersIcon className="w-4 h-4 text-purple-500" />
                <span>Seats Filled</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  filledPercent >= 100
                    ? "bg-red-100 text-red-700"
                    : filledPercent > 75
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {seatsAvailable > 0
                  ? `${seatsFilled} / ${event.seatCount}`
                  : "Sold Out"}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  filledPercent > 85
                    ? "bg-gradient-to-r from-red-400 to-rose-500"
                    : filledPercent > 50
                      ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "bg-gradient-to-r from-green-400 to-emerald-500"
                }`}
                style={{ width: `${filledPercent}%` }}
              />
            </div>
            {seatsAvailable > 0 && seatsAvailable <= 50 && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-red-600 animate-pulse">
                <span>🔥</span>
                <span>Only {seatsAvailable} seats left — Book now!</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 shadow-md ${
                seatsAvailable === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:from-purple-700 hover:to-violet-600 shadow-purple-300/40 hover:shadow-purple-400/50"
              }`}
              disabled={seatsAvailable === 0}
              onClick={() => seatsAvailable > 0 && setShowSeats(true)}
            >
              <span className="flex items-center justify-center gap-2">
                <TicketIcon className="w-4 h-4" />
                {seatsAvailable === 0 ? "Sold Out" : "Book Now"}
              </span>
            </button>

            <button
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 border-2 ${
                saved
                  ? "bg-pink-50 border-pink-300 text-pink-600 hover:bg-pink-100"
                  : "bg-white border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50"
              }`}
              onClick={() => toggleWatchlist(event.id)}
            >
              {saved ? (
                <HeartSolid className="w-5 h-5" />
              ) : (
                <HeartOutline className="w-5 h-5" />
              )}
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}
