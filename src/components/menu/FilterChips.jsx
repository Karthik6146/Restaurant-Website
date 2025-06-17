import React from "react";

const filters = ["all", "main", "appetizer", "dessert"];

function FilterChips({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex justify-center mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 mx-2 rounded-full ${
            activeFilter === filter
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterChips; 