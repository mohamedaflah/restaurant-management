import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId, data } = req.body;
    await restaurentDb.updateOne({ _id: restaurantId }, { $set: data });

    return res.status(200).json({ status: true, message: "Successful" });
  } catch (error) {
    next(error);
  }
};
