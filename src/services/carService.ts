import { Car, FilterState } from "../types/car";
const MOCK_CARS: Car[] = Array.from({ length: 50 }, (_, i) => {
  const brands = {
    Toyota: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1590510744132-f6b38ed54eca?w=800",
    ],
    Honda: [
      "https://images.unsplash.com/photo-1590510475821-27ad24fc7a4d?w=800",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800",
    ],
    BMW: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      "https://images.unsplash.com/photo-1570733117311-d990c3816c47?w=800",
    ],
    Mercedes: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=800",
    ],
    Audi: [
      "https://images.unsplash.com/photo-1606664825213-708b7e0e6d2c?w=800",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
    ],
  };

  const brand = ["Toyota", "Honda", "BMW", "Mercedes", "Audi"][
    Math.floor(Math.random() * 5)
  ];
  const brandImages = brands[brand as keyof typeof brands];
  const randomImageIndex = Math.floor(Math.random() * brandImages.length);

  return {
    id: `car-${i + 1}`,
    brand,
    model: `Model ${i + 1}`,
    price: Math.floor(Math.random() * 80000) + 20000,
    fuelType: ["Petrol", "Diesel", "Electric", "Hybrid"][
      Math.floor(Math.random() * 4)
    ] as Car["fuelType"],
    seatingCapacity: [2, 4, 5, 7][Math.floor(Math.random() * 4)],
    imageUrl: brandImages[randomImageIndex],
    specifications: {
      mileage: `${Math.floor(Math.random() * 20 + 10)} kmpl`,
      transmission: Math.random() > 0.5 ? "Automatic" : "Manual",
      engineSize: `${Math.floor(Math.random() * 2000 + 1000)}cc`,
      power: `${Math.floor(Math.random() * 200 + 100)}bhp`,
    },
  };
});

export const fetchCars = async (
  filters: FilterState,
  page: number,
  limit: number = 10
): Promise<{ cars: Car[]; total: number }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredCars = [...MOCK_CARS].filter((car) => {
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesSearch =
          car.brand.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.minPrice && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;

      return true;
    });

    if (filters.sortBy) {
      filteredCars.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCars = filteredCars.slice(start, end);

    return {
      cars: paginatedCars,
      total: filteredCars.length,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Failed to fetch cars");
  }
};
