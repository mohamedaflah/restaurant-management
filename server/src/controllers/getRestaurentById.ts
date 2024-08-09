import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.body;
    const restaurant = await restaurentDb.findOne({ _id: restaurantId });
    return res
      .status(200)
      .json({ status: true, message: "Success", restaurant });
  } catch (error) {
    next(error);
  }
};
