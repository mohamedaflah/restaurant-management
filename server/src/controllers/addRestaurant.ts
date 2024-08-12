import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";
import path from "path";
import fs from "fs";
export const addRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { images, menu } = body;
    let savedImage: string[] = [];
    images.forEach((base64: any, index: number) => {
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `image-${Date.now()}-${index}.png`;
      const filePath = path.join("public/images", fileName);
      fs.writeFileSync(filePath, buffer);
      savedImage.push(
        `${req.protocol}://${req.get("host")}/uploads/${fileName}`
      );
    });
    const updatedMenu = menu.map(
      (
        menu: { title: string; description: string; image: any },
        index: number
      ) => {
        const base64Data = menu.image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const fileName = `image-${Date.now()}-${index}.png`;
        const filePath = path.join("public/images", fileName);
        fs.writeFileSync(filePath, buffer);
        return {
          ...menu,
          image: `${"http://localhost:4000"}/uploads/${fileName}`,
        };
      }
    );
    body.images = savedImage;
    body.menu = updatedMenu;

    const restaurant = new restaurentDb({ ...body });
    await restaurant.save();
    return res.status(201).json({ status: true, restaurant });
  } catch (error) {
    next(error);
  }
};
