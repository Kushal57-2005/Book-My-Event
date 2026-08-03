import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Input({
  value,
  onChange,
  placeholder,
  onSearch,
  showButton = true,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) onSearch();
  };

  return (
    <div className="w-full max-w-md relative">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />

        <input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-white text-stone-900 text-sm font-medium placeholder:text-stone-400 border border-stone-200 rounded-xl pl-10 pr-24 py-3 transition-all duration-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-stone-300 shadow-sm"
        />

        {showButton && (
          <button
            onClick={onSearch}
            className="absolute right-1.5 bg-stone-900 text-amber-300 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-stone-800 transition-all duration-300 shadow-sm active:scale-95 border border-stone-800"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
}
