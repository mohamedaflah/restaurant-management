export interface IRestaurant {
  _id: string;
  name: string;
  location: string;
  cuisines?: string[];
  images?: string[];
  menu?: { description: string; image: string}[];
  description: string;
  contactNum?: string;
  pincode?: string;
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
    menu: ["Butter Chicken", "Naan", "Masala Dosa"],
    description: "A culinary journey through the spice-rich regions of India.",
    contactNum: "9876543210",
    pincode: "682001",
  },
  {
    _id: "2",
    name: "La Pinoz Pizza",
    location: "Pune, Maharashtra",
    cuisines: ["Italian", "Pizza"],
    images: [
      "https://images.unsplash.com/photo-1548365328-9dd30d34b9df",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    ],
    menu: ["Margherita Pizza", "Pepperoni Pizza"],
    description: "Serving the best pizzas with authentic Italian flavors.",
    contactNum: "9123456789",
    pincode: "411001",
  },
  {
    _id: "3",
    name: "Sushi World",
    location: "Tokyo, Japan",
    cuisines: ["Japanese", "Sushi"],
    images: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754",
      "https://images.unsplash.com/photo-1562967916-eb82221dfb53",
    ],
    menu: ["Sashimi", "California Roll", "Tempura"],
    description: "A taste of Japan with fresh sushi and traditional dishes.",
    contactNum: "+81 3456789012",
    pincode: "100-0001",
  },
  {
    _id: "4",
    name: "Bistro Cafe",
    location: "Paris, France",
    cuisines: ["French", "Cafe"],
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1544511916-0148ccdeb877",
    ],
    menu: ["Croissant", "Quiche", "French Onion Soup"],
    description: "A cozy cafe offering classic French pastries and dishes.",
    contactNum: "+33 123456789",
    pincode: "75001",
  },
  {
    _id: "5",
    name: "El Taco Loco",
    location: "Mexico City, Mexico",
    cuisines: ["Mexican"],
    images: [
      "https://images.unsplash.com/photo-1617196033665-2d4c9cf83a89",
      "https://images.unsplash.com/photo-1571091718769-0aa9c20320e6",
    ],
    menu: ["Tacos", "Burritos", "Guacamole"],
    description: "Authentic Mexican street food with a modern twist.",
    contactNum: "+52 9876543210",
    pincode: "01000",
  },
  {
    _id: "6",
    name: "Dragon Palace",
    location: "Beijing, China",
    cuisines: ["Chinese"],
    images: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    ],
    menu: ["Kung Pao Chicken", "Peking Duck", "Dim Sum"],
    description: "Traditional Chinese cuisine in a royal setting.",
    contactNum: "+86 1234567890",
    pincode: "100000",
  },
];
