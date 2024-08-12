import { NextFunction, Request, Response } from "express";
import { restaurentDb } from "../model/restaurent.model";

export const getAllRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, pageSize = 10, search, pincode, location } = req.query;
    console.log(req.query);

    const filter: any = {};

    if (search && search !== "undefined" && search !== "null") {
      filter.name = { $regex: search, $options: "i" };
    }

    if (location && location !== "undefined" && location !== "null") {
      filter.location = { $regex: location, $options: "i" };
    }

    if (pincode && pincode !== "undefined" && pincode !== "null") {
      filter.pincode = pincode;
    }

    const limit = parseInt(pageSize as string);
    const skip = (parseInt(page as string) - 1) * limit;

    const restaurants = await restaurentDb.find(filter).skip(skip).limit(limit);

    const totalRestaurants = await restaurentDb.countDocuments(filter);

    console.log({
      total: totalRestaurants,
      currentPage: page,
      totalPages: Math.ceil(totalRestaurants / limit),
    });
    // console.log(restaurants);

    res.status(200).json({
      restaurants,
      total: totalRestaurants,
      currentPage: page,
      totalPages: Math.ceil(totalRestaurants / limit),
    });
  } catch (error) {
    next(error);
  }
};
