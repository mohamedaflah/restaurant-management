import { axiosInstance } from "@/constants/axios";
import { getFileBase64 } from "@/lib/convertBase64";
import { handleErrors } from "@/lib/handleErrors";
import { restaurantSchema } from "@/lib/schemas/restaurant.schema";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const retaurantUpdateaction = createAsyncThunk(
  "restaurant/update-action",
  async (
    {
      sendData,
      id,
    }: { sendData: z.infer<typeof restaurantSchema>; id: string },
    { rejectWithValue }
  ) => {
    try {
      const copy = {
        ...sendData,
        menu: await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sendData.menu?.map(async (menu: any) => {
            let base64;
            if (typeof menu.image == "string") {
              base64 = menu.image;
            } else {
              base64 = await getFileBase64(menu.image);
            }
            return { ...menu, image: base64 };
          }) || []
        ),
        images: await Promise.all(
          sendData.images.map(async (image) => {
            let base64;
            if (typeof image == "string") {
              base64 = image;
            } else {
              base64 = await getFileBase64(image);
            }
            return base64;
          })
        ),
      };

      const { data } = await axiosInstance.put(`/api/restaurant`, {
        data: copy,
        restaurantId: id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
