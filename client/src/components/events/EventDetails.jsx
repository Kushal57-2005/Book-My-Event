import { useState, useRef } from "react";
import { useWatchlist } from "../../useWatchlist";
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
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleBackdropClose}
      />
      <div className="relative bg-white w-full max-w-full sm:max-w-[440px] rounded-t-3xl sm:rounded-3xl shadow-2xl animate-scaleIn z-50 overflow-hidden max-h-[90vh] overflow-y-auto border border-stone-200">
        <button
          className="absolute top-4 right-4 z-10 bg-stone-900/60 backdrop-blur-md text-white hover:bg-stone-900 rounded-full p-1.5 transition-all duration-300"
          onClick={onClose}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={event.img}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="bg-stone-900/90 backdrop-blur-md border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              {event.type}
            </span>

            {event.isPaid ? (
              <span className="bg-amber-400 text-stone-950 font-extrabold text-sm px-4 py-1.5 rounded-xl shadow-md">
                ₹{event.price}
              </span>
            ) : (
              <span className="bg-emerald-950/90 border border-emerald-700 text-emerald-300 font-extrabold text-sm px-4 py-1.5 rounded-xl shadow-md">
                Free Access
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-stone-50/40">
          <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-snug">
            {event.name}
          </h3>

          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-4">
            {event.info}
          </p>

          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700">
              <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0 border border-stone-200">
                <MapPinIcon className="w-4 h-4 text-stone-500" />
              </div>
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700">
              <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shrink-0 border border-stone-200">
                <CalendarDaysIcon className="w-4 h-4 text-stone-500" />
              </div>
              <span>{finalDate}</span>
            </div>
          </div>

          <div className="mb-6 bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                <UsersIcon className="w-4 h-4 text-stone-400" />
                <span>Pass Capacity</span>
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  filledPercent >= 100
                    ? "bg-rose-50 border-rose-200 text-rose-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}
              >
                {seatsAvailable > 0
                  ? `${seatsFilled} / ${event.seatCount}`
                  : "Sold Out"}
              </span>
            </div>

            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  filledPercent > 85
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
                style={{ width: `${filledPercent}%` }}
              />
            </div>

            {seatsAvailable > 0 && seatsAvailable <= 50 && (
              <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Only {seatsAvailable} passes left</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              className={`flex-1 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm ${
                seatsAvailable === 0
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-stone-900 border border-stone-800 text-amber-300 hover:bg-stone-800"
              }`}
              disabled={seatsAvailable === 0}
              onClick={() => seatsAvailable > 0 && setShowSeats(true)}
            >
              <span className="flex items-center justify-center gap-2">
                <TicketIcon className="w-4 h-4" />
                {seatsAvailable === 0 ? "Sold Out" : "Reserve Pass"}
              </span>
            </button>

            <button
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 border ${
                saved
                  ? "bg-amber-400 text-stone-950 border-amber-300"
                  : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
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
