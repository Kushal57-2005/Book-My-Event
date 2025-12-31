import Input from "../common/Input";
import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import FilterForm from "../pages/FilterForm"; // Import the FilterForm component
export default function EventSort({
  searchInput,
  setSearchInput,
  setSearchTerm,
  category,
  setCategory,
}) {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="w-full flex flex-col items-center gap-6 mb-8">
      <div className="flex flex-row gap-6 items-center">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search For Your Desired Event"
          onSearch={() => setSearchTerm(searchInput.trim())}
        />
        <button
          className="h-10 w-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-500 shrink-0"
          onClick={() => setShowFilter(!showFilter)}
        >
          {" "}
          <FunnelIcon className="w-6 h-6" />{" "}
        </button>
      </div>
      {showFilter && (
        <FilterForm category={category} setCategory={setCategory} />
      )}
    </div>
  );
}
