import mongoose from "mongoose";

const restaurentModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cuisines: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
  },
  menu: { type: [{ description: String, image: String }] },
  description: { type: String, required: true },
  contactNum: { type: String },
  pincode: { type: String },
});

export const restaurentDb =
  mongoose.models.restaurent || mongoose.model("restaurent", restaurentModel);
