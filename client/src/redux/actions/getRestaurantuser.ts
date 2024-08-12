import { axiosInstance } from "@/constants/axios";
import { handleErrors } from "@/lib/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllrestaurantUser = createAsyncThunk(
  "restaurant/get-rest-user",
  async (
    filter: {
      page: number | string | undefined;
      pageSize: number | string | undefined;
      search: string | undefined;
      pincode: string | undefined;
      location: string | undefined;
      reset: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/restaurant?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&pincode=${filter.pincode}&location=${filter.location}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
