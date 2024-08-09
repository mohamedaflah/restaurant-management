import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const getAllRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      type,
      search,
      cuisine,
      location,
      pincode,
    } = req.query;

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (pincode) {
      filter.pincode = pincode;
    }

    if (cuisine) {
      filter.cuisines = { $in: cuisine };
    }

    const limit = parseInt(pageSize as string);
    const skip = (parseInt(page as string) - 1) * limit;

    const restaurants = await restaurentDb.find(filter).skip(skip).limit(limit);

    const totalRestaurants = await restaurentDb.countDocuments(filter);

    res.status(200).json({
      data: restaurants,
      total: totalRestaurants,
      currentPage: page,
      totalPages: Math.ceil(totalRestaurants / limit),
    });
  } catch (error) {
    next(error);
  }
};
