import { Car } from "../types/car";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
}

export function CarCard({ car, isInWishlist, onWishlistToggle }: CarCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800";

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                 transition-all duration-300 hover:scale-105 hover:shadow-xl group 
                 cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <div className="relative">
          <img
            src={imageError ? fallbackImage : car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            onError={() => setImageError(true)}
            className="w-full h-48 object-cover transform group-hover:scale-105 
                     transition-transform duration-500"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle();
            }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 
                     dark:bg-gray-800/90 backdrop-blur-sm shadow-lg 
                     hover:bg-white dark:hover:bg-gray-700 
                     transition-all duration-200 transform hover:scale-110"
          >
            {isInWishlist ? (
              <span className="text-red-500 text-xl filter drop-shadow-md">
                ❤️
              </span>
            ) : (
              <span className="text-gray-400 text-xl filter drop-shadow-md">
                🤍
              </span>
            )}
          </button>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {car.brand} {car.model}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ₹{(car.price * 83).toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {car.specifications.engineSize}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">⛽ {car.fuelType}</span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full mx-4 
                        shadow-2xl transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={imageError ? fallbackImage : car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                onError={() => setImageError(true)}
                className="w-full h-64 object-cover rounded-xl mb-6"
                loading="lazy"
              />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 
                         backdrop-blur-sm rounded-full p-2 hover:bg-white 
                         dark:hover:bg-gray-700 transition-all duration-200"
              >
                ✕
              </button>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {car.brand} {car.model}
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  Price
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ₹{(car.price * 83).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  Fuel Type
                </p>
                <p className="text-xl text-gray-800 dark:text-gray-200">
                  {car.fuelType}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onWishlistToggle}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 
                         hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-full 
                         transition-all duration-200"
              >
                {isInWishlist
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
