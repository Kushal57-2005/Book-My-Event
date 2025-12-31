import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EventDetails from "./EventDetails";

export default function EventsCard({ event }) {
  const { name, location, img } = event;
  const [openCard, setOpenCard] = useState(null);

  return (
    <>
      {/* CARD */}
      <div className="relative w-[300px] h-[300px] overflow-hidden rounded-xl">
        <img
          src={img}
          className="w-full h-full object-cover brightness-50 transition-transform duration-500 ease-out hover:scale-110"
        />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col space-y-3 text-white">
          <h1 className="text-2xl font-bold">{name}</h1>
          <h3 className="text-xl font-lighter">{location}</h3>

          <button
            className="flex items-center gap-2 cursor-pointer group w-fit hover:text-purple-600"
            onClick={() => setOpenCard(event)}
          >
            <span className="text-lg">About More</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openCard && (
        <EventDetails event={openCard} onClose={() => setOpenCard(null)} />
      )}
    </>
  );
}
