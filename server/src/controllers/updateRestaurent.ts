import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";
import fs from "fs";
import path from "path";

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId, data } = req.body;
    const { images, menu } = data;
    console.log("🚀 ~ data:", data)
    
    let savedImages: string[] = [];
    console.log("🚀 ~ data: stage 1")
    
    // Process images
    for (const [index, image] of images.entries()) {
      if (image.startsWith("data:image/")) {
        // Convert base64 image to file
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const fileName = `image-${Date.now()}-${index}.png`;
        const filePath = path.join("public/images", fileName);
        fs.writeFileSync(filePath, buffer);
        savedImages.push(`${"http://localhost:4000"}/uploads/${fileName}`);
      } else {
        // Preserve existing image URL
        savedImages.push(image);
      }
    }
    
    console.log("🚀 ~ data: stage 2")
    // Process menu items
    const updatedMenu = menu.map(
      (menuItem: { title: string; image: any }, index: number) => {
        if (menuItem.image.startsWith("data:image/")) {
          // Convert base64 image to file
          const base64Data = menuItem.image.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const buffer = Buffer.from(base64Data, "base64");
          const fileName = `menu-image-${Date.now()}-${index}.png`;
          const filePath = path.join("public/images", fileName);
          fs.writeFileSync(filePath, buffer);
          return {
            ...menuItem,
            image: `${"http://localhost:4000"}/uploads/${fileName}`,
          };
        } else {
          // Preserve existing image URL
          return menuItem;
        }
      }
    );
    
    console.log("🚀 ~ data: stage 3")
    // Update data with new images and menu
    data.images = savedImages;
    data.menu = updatedMenu;
    
    // Update the restaurant document
    const updatedRestaurant = await restaurentDb.findOneAndUpdate(
      { _id: restaurantId },
      { $set: data },
      { new: true }
    );
    console.log("🚀 ~ data: stage 4",updatedRestaurant)

    return res.status(200).json({
      status: true,
      message: "Successful",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    next(error);
  }
};
