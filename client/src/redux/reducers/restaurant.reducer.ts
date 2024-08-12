import { IRestaurant, RestaurantInitial } from "@/types/restaurant.type";
import { createSlice } from "@reduxjs/toolkit";
import { retaurantAddaction } from "../actions/restaurant-add.action";
import toast from "react-hot-toast";
import { getAllrestaurantAdmin } from "../actions/getAllrestaurant.action";
import { retaurantUpdateaction } from "../actions/updateRestaurant";
import { deleteRestaurant } from "../actions/deleteRestaurantAction";
import { getAllrestaurantUser } from "../actions/getRestaurantuser";

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
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRestaurant.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.restaurants = state.restaurants?.filter(
          (res) => res._id !== payload.id
        ) as IRestaurant[];
        state.err = false;
      })
      .addCase(deleteRestaurant.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
      })
      .addCase(getAllrestaurantUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllrestaurantUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state?.restaurants) {
          state.restaurants = [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...payload.restaurants,
          ] as IRestaurant[];
        } else {
          state.restaurants = [...payload.restaurants];
        }
        state.filters.currentPage = payload.currentPage;
        state.filters.total = payload.total;
        state.filters.totalPages = payload.totalPages;
        state.err = false;
      })
      .addCase(getAllrestaurantUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = String(payload);
        toast.error(state.err);
      });
  },
});

export default restaurantReducer.reducer;
