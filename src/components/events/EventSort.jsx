import Input from "../common/Input";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import FilterForm from "../pages/FilterForm";

export default function EventSort({
  searchInput,
  setSearchInput,
  category,
  setCategory,
  timeFilter,
  setTimeFilter,
  locationFilter,
  setLocationFilter,
  locations,
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4 mb-10">
      <div className="flex flex-row gap-3 items-center w-full max-w-lg">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search events by name..."
          showButton={false}
        />
        <button
          className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 active:scale-90 ${
            showFilter
              ? "bg-purple-700 text-white shadow-lg shadow-purple-300/40 rotate-180"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      {showFilter && (
        <div className="animate-slideDown w-full max-w-3xl">
          <FilterForm
            category={category}
            setCategory={setCategory}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            locations={locations}
          />
        </div>
      )}
    </div>
  );
}
