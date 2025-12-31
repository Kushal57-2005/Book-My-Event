import { useEffect, useState } from "react";
import EventList from "./EventList";
import EventSort from "./EventSort";
export default function Events() {
  const [events, setEvents] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "all" ? true : e.type === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="Events mt-20 mb-20 flex flex-col justify-center items-center">
      <EventSort
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      />

      <EventList events={filteredEvents} />
    </section>
  );
}
