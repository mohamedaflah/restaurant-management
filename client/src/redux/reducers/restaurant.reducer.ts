import { IRestaurant, RestaurantInitial } from "@/types/restaurant.type";
import { createSlice } from "@reduxjs/toolkit";
import { retaurantAddaction } from "../actions/restaurant-add.action";
import toast from "react-hot-toast";
import { getAllrestaurantAdmin } from "../actions/getAllrestaurant.action";
import { retaurantUpdateaction } from "../actions/updateRestaurant";

const initialState: RestaurantInitial = {
  loading: false,
  err: false,
  restaurant: null,
  restaurants: null,
  filters: {
    currentPage: null,
    total: null,
    totalPages: null,
  },
};

const restaurantReducer = createSlice({
  name: "restaurant-reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retaurantAddaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(retaurantAddaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.restaurants?.push(payload.restaurant);
        state.err = false;
      })
      .addCase(retaurantAddaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(getAllrestaurantAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllrestaurantAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.restaurants = payload.restaurants;
        state.filters.currentPage = payload.currentPage;
        state.filters.total = payload.total;
        state.filters.totalPages = payload.totalPages;
        state.err = false;
        // total: totalRestaurants,
        // currentPage: page,
        // totalPages: Math.ceil(totalRestaurants / limit),
      })
      .addCase(getAllrestaurantAdmin.rejected, (state, { payload }) => {
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(retaurantUpdateaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(retaurantUpdateaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.restaurants = state.restaurants?.map((restaurant) => {
          if (restaurant._id == payload.restaurant._id) {
            return payload.restaurant;
          } else {
            return restaurant;
          }
        }) as IRestaurant[];
      })
      .addCase(retaurantUpdateaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      });
  },
});

export default restaurantReducer.reducer;
