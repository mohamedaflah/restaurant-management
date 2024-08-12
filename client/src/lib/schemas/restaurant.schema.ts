import { z } from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, { message: "2 charecters need" })
    .max(22, { message: "Restaurant cannot exceed 22 characters" }),
  location: z
    .string()
    .min(2, { message: " 2 characters long" })
    .max(22, { message: "Location cannot exceed 22 characters" }),
  images: z
    .array(
      z.union([
        z.string().url(), // Accepts string URLs
        z.instanceof(File).refine((file) => file.size <= 5000000, {
          message: "Each image file must be less than 5MB",
        }),
      ])
    )
    .nonempty({ message: "At least one image is required" }),
  menu: z
    .array(
      z.object({
        title: z.string().min(2),
        description: z.string().min(2, {
          message: "Menu item description must be at least 2 characters long",
        }),
        image: z.union([
          z.string().url(), // Accepts string URLs
          z.instanceof(File).refine((file) => file.size <= 5000000, {
            message: "The image file must be less than 5MB",
          }),
        ]),
      })
    )
    .nonempty(),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  contactNum: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Contact number can only contain digits" }),
  pincode: z
    .string()
    .length(6, { message: "Pincode must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Pincode can only contain digits" }),
});

// export interface IRestaurant {
//     _id: string;
//     name: string;
//     location: string;
//     cuisines?: string[];
//     images?: string[];
//     menu?: { description: string; images: string[] }[];
//     description: string;
//     contactNum?: string;
//     pincode
