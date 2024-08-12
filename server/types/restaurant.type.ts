export interface IRestaurant {
  name: string;
  location: string;
  cuisines?: string[];
  images?: string[];
  menu?: { description: string; images: string[] }[];
  description: string;
  contactNum?: string;
  pincode?: string;
}
