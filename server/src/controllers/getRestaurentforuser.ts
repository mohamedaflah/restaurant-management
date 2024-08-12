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
      loadedIds = [], // Array of already loaded document IDs
    } = req.query;

    const filters: any = {};
    console.log(req.query);

    if (location) filters.location = location;
    if (pincode) filters.pincode = pincode;
    if (search) filters.name = { $regex: search, $options: "i" };
    if (cuisines) filters.cuisines = { $in: (cuisines as any).split(",") };

    // Exclude already loaded documents
    if ((loadedIds as any[])?.length > 0) {
      filters._id = { $nin: loadedIds };
    }

    // Calculate the skip value for pagination
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    // Fetch the new data
    const newRestaurants = await restaurentDb
      .find(filters)
      .skip(skip)
      .limit(parseInt(pageSize as string));
    const totalCount = await restaurentDb.countDocuments(filters);

    // Combine existing data with new data
    const allRestaurants = [...(loadedIds as any), ...newRestaurants];

    res.status(200).json({
      restaurants: allRestaurants,
      totalCount,
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(totalCount / parseInt(pageSize as string)),
    });
  } catch (error) {
    next(error);
  }
};
