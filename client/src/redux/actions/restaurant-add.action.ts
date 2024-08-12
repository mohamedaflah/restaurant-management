import { axiosInstance } from "@/constants/axios";
import { getFileBase64 } from "@/lib/convertBase64";
import { handleErrors } from "@/lib/handleErrors";
import { restaurantSchema } from "@/lib/schemas/restaurant.schema";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const retaurantAddaction = createAsyncThunk(
  "restaurant/add-action",
  async (
    sendPayload: z.infer<typeof restaurantSchema>,
    { rejectWithValue }
  ) => {
    try {
      const copy = {
        ...sendPayload,
        menu: await Promise.all(
          sendPayload.menu?.map(async (menu) => {
            const base64 = await getFileBase64(menu.image as File);
            return { ...menu, image: base64 };
          }) || []
        ),
        images: await Promise.all(
          sendPayload.images.map(async (image) => {
            const base64 = await getFileBase64(image);
            return base64;
          })
        ),
      };

      const { data } = await axiosInstance.post(`/api/restaurant`, copy);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
