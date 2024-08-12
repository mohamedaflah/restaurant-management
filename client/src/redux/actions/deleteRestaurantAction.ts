import { axiosInstance } from "@/constants/axios";
import { handleErrors } from "@/lib/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteRestaurant = createAsyncThunk(
  "restaurant/delete-rest",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/restaurant?restaurantId=${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
