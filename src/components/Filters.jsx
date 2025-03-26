import React, { useState } from "react";
import { ChevronDown, Check, XCircle, Sliders } from "lucide-react";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    sort: "",
    priceRange: 100,
  });

  // Toggle Sort Filters
  const toggleSort = (value) => {
    const newSort = selectedFilters.sort === value ? "" : value;
    setSelectedFilters({ ...selectedFilters, sort: newSort });
    onFilterChange({ ...selectedFilters, sort: newSort });
  };

  // Handle Price Change
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setSelectedFilters({ ...selectedFilters, priceRange: newPrice });
    onFilterChange({ ...selectedFilters, priceRange: newPrice });
  };

  // Reset All Filters
  const resetFilters = () => {
    setSelectedFilters({ sort: "", priceRange: 100 });
    onFilterChange({ sort: "", priceRange: 100 });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between w-full gap-4">
      {/* Filters Header */}
      <div className="flex items-center gap-2">
        <Sliders className="text-gray-700" size={20} />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        <button
          onClick={() => toggleSort("low-high")}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            selectedFilters.sort === "low-high"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Low to High {selectedFilters.sort === "low-high" && <Check size={16} />}
        </button>

        <button
          onClick={() => toggleSort("high-low")}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
            selectedFilters.sort === "high-low"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          High to Low {selectedFilters.sort === "high-low" && <Check size={16} />}
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium">
          Price Range: <span className="font-bold">${selectedFilters.priceRange}</span>
        </label>
        <input
          type="range"
          min="10"
          max="1000"
          value={selectedFilters.priceRange}
          onChange={handlePriceChange}
          className="w-40"
        />
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={resetFilters}
        className="flex items-center gap-1 text-red-600"
      >
        <XCircle size={18} />
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
