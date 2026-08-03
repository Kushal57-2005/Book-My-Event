const categories = [
  { value: "music", label: "Music" },
  { value: "education", label: "Education" },
  { value: "cultural", label: "Cultural" },
  { value: "entertainment", label: "Entertainment" },
  { value: "spiritual", label: "Spiritual" },
];

const timeSlots = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Night" },
];

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function FilterForm({
  category,
  setCategory,
  timeFilter,
  setTimeFilter,
  locationFilter,
  setLocationFilter,
  locations,
}) {
  return (
    <div className="flex flex-col gap-5 items-center p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
      {/* Category Filter */}
      <div className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 text-center mb-2.5">
          Category
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setCategory([])}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
              category.length === 0
                ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(toggle(category, cat.value))}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
                category.includes(cat.value)
                  ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 text-center mb-2.5">
          Time of Day
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setTimeFilter([])}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
              timeFilter.length === 0
                ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All Times
          </button>
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              onClick={() => setTimeFilter(toggle(timeFilter, slot.value))}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
                timeFilter.includes(slot.value)
                  ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 text-center mb-2.5">
          Location
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setLocationFilter([])}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
              locationFilter.length === 0
                ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All Locations
          </button>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocationFilter(toggle(locationFilter, loc))}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer border ${
                locationFilter.includes(loc)
                  ? "bg-stone-900 border-stone-800 text-amber-300 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
