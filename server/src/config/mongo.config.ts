import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then((res) => console.log(`Db connected `))
  .catch((err) => console.log(`Database connection error ${err}`));
