export interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  seatingCapacity: number;
  imageUrl: string;
  specifications: {
    mileage: string;
    transmission: "Automatic" | "Manual";
    engineSize: string;
    power: string;
  };
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: Car["fuelType"] | "";
  sortBy: "price_asc" | "price_desc" | "";
}
