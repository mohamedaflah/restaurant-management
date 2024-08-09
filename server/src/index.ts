import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config";
const app: Application = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ status: false, message: err.message });
});
app.listen(process.env.PORT, () => console.log(`Server started`));
