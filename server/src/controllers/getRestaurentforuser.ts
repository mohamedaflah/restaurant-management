import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const getAllRestaurantforUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      location,
      pincode,
      search,
      cuisines,
    } = req.query;

    const filters: any = {};

    if (location) filters.location = location;
    if (pincode) filters.pincode = pincode;
    if (search) filters.name = { $regex: search, $options: "i" };
    if (cuisines) filters.cuisines = { $in: (cuisines as any).split(",") };

    // Calculate the skip value for pagination
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    const restaurants = await restaurentDb
      .find(filters)
      .skip(skip)
      .limit(parseInt(pageSize as string));
    const totalCount = await restaurentDb.countDocuments(filters);

    res.status(200).json({
      data: restaurants,
      totalCount,
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(totalCount / parseInt(pageSize as string)),
    });
  } catch (error) {
    next(error);
  }
};
