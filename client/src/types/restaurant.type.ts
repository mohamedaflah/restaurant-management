export interface IRestaurant {
  _id: string;
  name: string;
  location: string;
  cuisines?: string[];
  images?: string[];
  menu?: { description: string; image: string; title: string }[];
  description: string;
  contactNum?: string;
  pincode?: string;
}

export interface RestaurantInitial {
  loading: boolean;
  err: boolean | string;
  restaurant: IRestaurant | null;
  restaurants: IRestaurant[] | null;
  filters: {
    total: number | null;
    currentPage: number | null;
    totalPages: number | null;
  };
}

export const sampleRestaurants: IRestaurant[] = [
  {
    _id: "1",
    name: "The Spice Route",
    location: "Kochi, Kerala",
    cuisines: ["Indian", "Asian"],
    images: [
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://images.unsplash.com/photo-1578926281925-0c58a2cf9ec5",
    ],
    menu: [
      {
        description: "asdfafsd",
        image: "https://images.unsplash.com/photo-1578926281925-0c58a2cf9ec5",
        title: "safdio",
      },
    ],
    description: "A culinary journey through the spice-rich regions of India.",
    contactNum: "9876543210",
    pincode: "682001",
  },
];
