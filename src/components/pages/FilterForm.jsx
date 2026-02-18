const categories = [
  { value: "music", label: "Music", emoji: "🎵" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "cultural", label: "Cultural", emoji: "🎭" },
  { value: "entertainment", label: "Entertainment", emoji: "🎪" },
  { value: "spiritual", label: "Spiritual", emoji: "🕉️" },
];

const timeSlots = [
  { value: "morning", label: "Morning", emoji: "🌅" },
  { value: "afternoon", label: "Afternoon", emoji: "☀️" },
  { value: "evening", label: "Evening", emoji: "🌇" },
  { value: "night", label: "Night", emoji: "🌙" },
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
    <div className="flex flex-col gap-4 items-center">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-2">
          Category
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setCategory([])}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
              category.length === 0
                ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            <span className="text-base leading-none">✨</span>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(toggle(category, cat.value))}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
                category.includes(cat.value)
                  ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <span className="text-base leading-none">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-2">
          Time of Day
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setTimeFilter([])}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
              timeFilter.length === 0
                ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            <span className="text-base leading-none">🕐</span>
            All
          </button>
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              onClick={() => setTimeFilter(toggle(timeFilter, slot.value))}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
                timeFilter.includes(slot.value)
                  ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <span className="text-base leading-none">{slot.emoji}</span>
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-2">
          Location
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setLocationFilter([])}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
              locationFilter.length === 0
                ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            <span className="text-base leading-none">📍</span>
            All
          </button>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocationFilter(toggle(locationFilter, loc))}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
                locationFilter.includes(loc)
                  ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <span className="text-base leading-none">📍</span>
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
