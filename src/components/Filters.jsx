import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState(100);

  // Handle filter changes
  const handleSortChange = (e) => {
    setSort(e.target.value);
    onFilterChange({ sort: e.target.value, priceRange });
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange({ sort, priceRange: e.target.value });
  };

  const resetFilters = () => {
    setSort("");
    setPriceRange(100);
    onFilterChange({ sort: "", priceRange: 100 });
  };

  return (
    <div className="w-1/6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Sort By Price */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Sort by Price:</label>
        <select
          value={sort}
          onChange={handleSortChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Price Range: ${priceRange}</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className=" text-red-600 "
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
