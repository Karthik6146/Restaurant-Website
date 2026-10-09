import React from "react";
const filters = [
  ["all", "All dishes"],
  ["appetizer", "Starters"],
  ["main", "Mains"],
  ["dessert", "Desserts"],
];
export default function FilterChips({ activeFilter, setActiveFilter }) {
  return (
    <div
      className="filter-chips"
      role="group"
      aria-label="Filter dishes by category"
    >
      {filters.map(([value, label]) => (
        <button
          className="filter-chip"
          type="button"
          key={value}
          aria-pressed={activeFilter === value}
          onClick={() => setActiveFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
