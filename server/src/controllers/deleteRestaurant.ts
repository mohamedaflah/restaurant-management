import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.query;
    await restaurentDb.deleteOne({ _id: restaurantId });
    return res.status(200).json({ status: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};
