import EventsCard from "./EventsCard";

export default function EventList({ events }) {
  // If nothing matches search
  if (events.length === 0) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-gray-600">
        🔍 No results found
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-8 p-10 bg-gray-200
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4
        place-items-center rounded-xl
      "
    >
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
