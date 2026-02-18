import { useEffect, useState, useMemo } from "react";
import EventList from "./EventList";
import EventSort from "./EventSort";
import { SparklesIcon } from "@heroicons/react/24/solid";
function getTimeSlot(timeStr) {
  if (!timeStr) return "morning";
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "morning";
  let hours = parseInt(match[1], 10);
  const period = match[3].toUpperCase();
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  if (hours >= 5 && hours < 12) return "morning";      // 5 AM – 11:59 AM
  if (hours >= 12 && hours < 17) return "afternoon";    // 12 PM – 4:59 PM
  if (hours >= 17 && hours < 21) return "evening";      // 5 PM – 8:59 PM
  return "night";                                       // 9 PM – 4:59 AM
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [timeFilters, setTimeFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  const locations = useMemo(() => {
    const set = new Set(events.map((e) => e.location));
    return [...set].sort();
  }, [events]);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.name
      .toLowerCase()
      .includes(searchInput.toLowerCase().trim());
    const matchesCategory = categories.length === 0 || categories.includes(e.type);
    const matchesTime =
      timeFilters.length === 0 || timeFilters.includes(getTimeSlot(e.time));
    const matchesLocation =
      locationFilters.length === 0 || locationFilters.includes(e.location);
    return matchesSearch && matchesCategory && matchesTime && matchesLocation;
  });

  return (
    <section
      id="events"
      className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <SparklesIcon className="w-3.5 h-3.5" />
            Discover Events
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 bg-clip-text text-transparent">Upcoming Events</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Find and book the best events happening near you — from concerts to
            workshops and beyond.
          </p>
        </div>

        <EventSort
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          category={categories}
          setCategory={setCategories}
          timeFilter={timeFilters}
          setTimeFilter={setTimeFilters}
          locationFilter={locationFilters}
          setLocationFilter={setLocationFilters}
          locations={locations}
        />

        <EventList events={filteredEvents} />
      </div>
    </section>
  );
}
