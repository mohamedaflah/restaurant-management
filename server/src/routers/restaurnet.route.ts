import { Router } from "express";
import { addRestaurant } from "../controllers/addRestaurant";
import { updateRestaurant } from "../controllers/updateRestaurent";
import { deleteRestaurant } from "../controllers/deleteRestaurant";
import { getAllRestaurant } from "../controllers/getAllrestaurants";
import { getAllRestaurantforUsers } from "../controllers/getRestaurentforuser";

const restaurentRouter = Router();

restaurentRouter
  .route(`/restaurant`)
  .post(addRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant)
  .get(getAllRestaurant);
restaurentRouter.route(`/restaurant2`).get(getAllRestaurantforUsers);
export default restaurentRouter;
