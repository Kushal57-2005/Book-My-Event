import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import EventDetails from "./EventDetails";
import { useWatchlist } from "../../useWatchlist";
import Card3D from "../common/Card3D";

export default function EventsCard({ event }) {
  const { name, location, img, type, isPaid, price, seatAvailable } = event;
  const [openCard, setOpenCard] = useState(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(event.id);
  const seatsLeft = Number(seatAvailable ?? 0);

  return (
    <>
      <Card3D className="w-full">
        <div className="group relative w-full h-[390px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-stone-200/80 cursor-pointer flex flex-col justify-between">
          {/* Card Media Header */}
          <div className="relative h-[55%] overflow-hidden" onClick={() => setOpenCard(event)}>
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
            
            <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {type}
            </span>

            <button
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 active:scale-90 ${
                saved
                  ? "bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20"
                  : "bg-stone-900/40 backdrop-blur-md border border-stone-700/50 text-white hover:bg-stone-900/70"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(event.id);
              }}
            >
              {saved ? (
                <HeartSolid className="w-4 h-4" />
              ) : (
                <HeartOutline className="w-4 h-4" />
              )}
            </button>

            <div className="absolute bottom-3 right-3">
              {isPaid ? (
                <span className="bg-stone-900/90 border border-stone-700 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                  ₹{price}
                </span>
              ) : (
                <span className="bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                  Free
                </span>
              )}
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-5 h-[45%] flex flex-col justify-between bg-stone-50/40">
            <div>
              <h3 className="text-base font-bold text-stone-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
                {name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium">
                <MapPinIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="truncate">{location}</span>
              </div>

              {seatsLeft > 0 && seatsLeft <= 50 && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200/80 text-[11px] font-semibold text-rose-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Only {seatsLeft} seats remaining</span>
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-2 text-stone-900 font-bold text-xs group/btn w-fit hover:text-amber-600 transition-colors mt-2"
              onClick={() => setOpenCard(event)}
            >
              <span>View Pass</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </Card3D>

      {openCard && (
        <EventDetails event={openCard} onClose={() => setOpenCard(null)} />
      )}
    </>
  );
}
