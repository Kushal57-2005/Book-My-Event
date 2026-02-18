import EventsCard from "./EventsCard";

export default function EventList({ events }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeInUp">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          No events found
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-8 p-8
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4
        place-items-center rounded-2xl
        bg-white/60 border border-gray-100 shadow-sm
      "
    >
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
