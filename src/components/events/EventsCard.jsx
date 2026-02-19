import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import EventDetails from "./EventDetails";
import { useWatchlist } from "../context/useWatchlist";

export default function EventsCard({ event }) {
  const { name, location, img, type, isPaid, price, seatAvailable } = event;
  const [openCard, setOpenCard] = useState(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(event.id);
  const seatsLeft = Number(seatAvailable ?? 0);

  return (
    <>
      <div className="group relative w-[300px] h-[380px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-purple-200/30 transition-all duration-500 bg-white border border-gray-100 cursor-pointer">
        <div className="relative h-[55%] overflow-hidden" onClick={() => setOpenCard(event)}>
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            {type}
          </span>
          <button
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 active:scale-90 ${
              saved
                ? "bg-pink-500 shadow-lg shadow-pink-400/30"
                : "bg-black/30 backdrop-blur-sm hover:bg-black/50"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(event.id);
            }}
          >
            {saved ? (
              <HeartSolid className="w-4 h-4 text-white" />
            ) : (
              <HeartOutline className="w-4 h-4 text-white" />
            )}
          </button>

          <div className="absolute bottom-3 right-3">
            {isPaid ? (
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ₹{price}
              </span>
            ) : (
              <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Free
              </span>
            )}
          </div>
        </div>
        <div className="p-5 h-[45%] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPinIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            {seatsLeft > 0 && seatsLeft <= 50 && (
              <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-red-600 animate-pulse">
                <span>🔥</span>
                <span>Only {seatsLeft} seats left</span>
              </div>
            )}
          </div>

          <button
            className="flex items-center gap-2 text-purple-600 font-semibold text-sm group/btn w-fit hover:text-purple-800 transition-colors mt-2"
            onClick={() => setOpenCard(event)}
          >
            <span>View Details</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
      {openCard && (
        <EventDetails event={openCard} onClose={() => setOpenCard(null)} />
      )}
    </>
  );
}
