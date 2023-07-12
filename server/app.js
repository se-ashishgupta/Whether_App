import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import whetherRoute from "./routes/route.js";
import cors from "cors";
//craeting server
export const app = express();

config({
  path: "./data/config.env",
});

//Using Middleware
app.use(express.json()); //Used before routes mendetory
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//Using Routes
app.use(whetherRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});
