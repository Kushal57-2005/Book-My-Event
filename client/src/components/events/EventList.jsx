import EventsCard from "./EventsCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function EventList({ events, loading }) {
  if (loading) {
    return (
      <div
        className="
          grid gap-6 sm:gap-8 p-4 sm:p-8
          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4
          place-items-center rounded-2xl
          bg-white border border-stone-200/80 shadow-sm
        "
      >
        {Array(6).fill(0).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeInUp">
        <div className="w-16 h-16 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center mb-4 text-stone-500">
          <MagnifyingGlassIcon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-stone-800 mb-1">
          No matching events found
        </h3>
        <p className="text-stone-500 text-xs sm:text-sm max-w-xs">
          Try adjusting your search criteria or clear active filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-6 sm:gap-8 p-4 sm:p-8
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4
        place-items-center rounded-2xl
        bg-white border border-stone-200/80 shadow-sm
      "
    >
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
