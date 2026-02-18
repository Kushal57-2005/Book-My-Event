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
        <MagnifyingGlassIcon className="absolute left-3.5 w-5 h-5 text-gray-400 pointer-events-none" />

        <input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-white text-gray-800 text-sm font-medium placeholder:text-gray-400 border border-gray-200 rounded-xl pl-11 pr-24 py-3 transition-all duration-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 hover:border-gray-300 shadow-sm"
        />

        {showButton && (
          <button
            onClick={onSearch}
            className="absolute right-1.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-violet-600 transition-all duration-300 shadow-sm active:scale-95"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
}
