import { useEffect, useState, useMemo } from "react";
import EventList from "./EventList";
import EventSort from "./EventSort";
import { getEventsApi } from "../../api/events";

function getTimeSlot(timeStr) {
  if (!timeStr) return "morning";
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "morning";
  let hours = parseInt(match[1], 10);
  const period = match[3].toUpperCase();
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  if (hours >= 5 && hours < 12) return "morning"; // 5 AM – 11:59 AM
  if (hours >= 12 && hours < 17) return "afternoon"; // 12 PM – 4:59 PM
  if (hours >= 17 && hours < 21) return "evening"; // 5 PM – 8:59 PM
  return "night"; // 9 PM – 4:59 AM
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [timeFilters, setTimeFilters] = useState([]);
  const [locationFilters, setLocationFilters] = useState([]);

  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      const params = {};
      if (searchInput.trim()) params.search = searchInput.trim();
      if (categories.length > 0) params.type = categories[0];

      getEventsApi(params)
        .then((data) => {
          if (isMounted) {
            setEvents(data);
            setLoading(false);
            if (allLocations.length === 0) {
              const locs = [...new Set(data.map((e) => e.location))].sort();
              setAllLocations(locs);
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching search API events:", err);
          if (isMounted) setLoading(false);
        });
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchInput, categories]);

  const locations = useMemo(() => {
    if (allLocations.length > 0) return allLocations;
    const set = new Set(events.map((e) => e.location));
    return [...set].sort();
  }, [events, allLocations]);

  const filteredEvents = events.filter((e) => {
    const matchesCategory =
      categories.length <= 1 || categories.includes(e.type);
    const matchesTime =
      timeFilters.length === 0 || timeFilters.includes(getTimeSlot(e.time));
    const matchesLocation =
      locationFilters.length === 0 || locationFilters.includes(e.location);
    return matchesCategory && matchesTime && matchesLocation;
  });

  return (
    <section id="events" className="relative py-20 px-4 sm:px-8 bg-[#fbfbf9]">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">
            Live Ticket Catalog
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-3">
            Explore <span className="text-amber-600">Upcoming Events</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Reserve tickets for curated music concerts, technological summits,
            and cultural festivals across India.
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

        <EventList events={filteredEvents} loading={loading} />
      </div>
    </section>
  );
}
