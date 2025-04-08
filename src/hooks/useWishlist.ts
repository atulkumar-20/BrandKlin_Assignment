import { useState, useEffect } from "react";
import { Car } from "../types/car";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Car[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car: Car) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === car.id)) return prev;
      return [...prev, car];
    });
  };

  const removeFromWishlist = (carId: string) => {
    setWishlist((prev) => prev.filter((car) => car.id !== carId));
  };

  const isInWishlist = (carId: string): boolean => {
    return wishlist.some((car) => car.id === carId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
