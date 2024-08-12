import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/mongo.config";
import restaurentRouter from "./routers/restaurnet.route";
const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);
app.use(express.json({ limit: "Infinity" }));
app.use(express.urlencoded({ limit: "Infinity", extended: true }));
app.use(cookieParser());
app.use("/images", express.static("public/images"));
app.use(`/api`, restaurentRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ status: false, message: err.message });
});
app.listen(process.env.PORT, () =>
  console.log(`Server started ${process.env.PORT}`)
);
