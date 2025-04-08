import { FilterState } from "../types/car";
import { useState } from "react";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | number) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const brands = ["Toyota", "Honda", "BMW", "Mercedes", "Audi"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const [searchTimeout, setSearchTimeout] =
    useState<ReturnType<typeof setTimeout>>();
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      onFilterChange("searchQuery", value);
    }, 300);
    setSearchTimeout(timeout);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Search Bar and Filter Toggle */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search your dream car..."
            defaultValue={filters.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-14 rounded-full border-2 border-gray-300 bg-white/80 
                     dark:bg-gray-800/80 dark:border-gray-600 backdrop-blur-sm px-6 
                     pl-14 text-lg shadow-lg focus:border-gray-500 focus:ring-2 
                     focus:ring-gray-300 transition-all duration-300 hover:shadow-xl 
                     dark:text-white dark:placeholder-gray-400"
          />
          <span className="absolute left-5 top-4 text-xl">🔍</span>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 h-14 rounded-full bg-gray-800 hover:bg-gray-700 
                   dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold 
                   shadow-lg hover:shadow-xl transition-all duration-300 flex 
                   items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span className="text-xl">🎯</span>
          Filters
          <span
            className={`transition-transform duration-300 ${
              showFilters ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-2xl 
                      shadow-xl p-6 border border-gray-200 dark:border-gray-700 
                      space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => onFilterChange("brand", e.target.value)}
                className="w-full h-11 rounded-lg border-2 border-gray-300 bg-white/80 px-4
                         focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Price Range (₹)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    onFilterChange("minPrice", Number(e.target.value))
                  }
                  className="w-full h-11 rounded-lg border-2 border-gray-300 bg-white/80 px-4
                           focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFilterChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full h-11 rounded-lg border-2 border-gray-300 bg-white/80 px-4
                           focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Fuel Type
              </label>
              <select
                value={filters.fuelType}
                onChange={(e) => onFilterChange("fuelType", e.target.value)}
                className="w-full h-11 rounded-lg border-2 border-gray-300 bg-white/80 px-4
                         focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all"
              >
                <option value="">All Types</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
              className="w-48 h-11 rounded-lg border-2 border-gray-300 bg-white/80 px-4
                       focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all"
            >
              <option value="">Sort by Price</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
