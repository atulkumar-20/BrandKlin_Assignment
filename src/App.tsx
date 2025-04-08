import { useState, useEffect } from "react";
import { Car, FilterState } from "./types/car";
import { fetchCars } from "./services/carService";
import { useWishlist } from "./hooks/useWishlist";
import { Filters } from "./components/Filters";
import { CarCard } from "./components/CarCard";
import { Pagination } from "./components/Pagination";

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    brand: "",
    minPrice: 0,
    maxPrice: 0,
    fuelType: "",
    sortBy: "",
  });

  useEffect(() => {
    // Initialize dark mode from system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCars(controller.signal);
    return () => controller.abort();
  }, [filters, currentPage, showWishlist]);

  const loadCars = async (signal?: AbortSignal) => {
    if (showWishlist) {
      setCars(wishlist);
      setTotalCars(wishlist.length);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { cars: newCars, total } = await fetchCars(filters, currentPage);
      if (!signal?.aborted) {
        setCars(newCars);
        setTotalCars(total);
      }
    } catch (err) {
      if (!signal?.aborted) {
        setError("Failed to load cars. Please try again later.");
        setCars([]);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleWishlistToggle = (car: Car) => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const totalPages = Math.ceil(totalCars / 10);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 sticky top-0 z-10 shadow-lg backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight hover:text-gray-200 transition-colors">
            Car Finder
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowWishlist(!showWishlist)}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 
                         active:bg-gray-800 transition-all duration-200 shadow-md 
                         hover:shadow-lg flex items-center gap-2"
            >
              {showWishlist
                ? "🚗 Show All Cars"
                : `❤️ Wishlist (${wishlist.length})`}
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 
                         active:bg-gray-800 transition-all duration-200 shadow-md 
                         hover:shadow-lg"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {!showWishlist && (
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-r-lg animate-fadeIn">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isInWishlist={isInWishlist(car.id)}
                  onWishlistToggle={() => handleWishlistToggle(car)}
                />
              ))}
            </div>

            {!showWishlist && cars.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {cars.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-400 mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-xl font-semibold">
                  {showWishlist
                    ? "No cars in wishlist"
                    : "No cars found matching your criteria"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
