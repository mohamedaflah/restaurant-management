import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const addRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const restaurant = new restaurentDb({ ...body });
    return res.status(201).json({ status: true, restaurant });
  } catch (error) {
    next(error);
  }
};
