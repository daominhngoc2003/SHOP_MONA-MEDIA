import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import usertRouter from "./routes/user";
import authtRouter from "./routes/auth";
import uploadRouter from "./routes/upload";
import connectDB from "../src/config/database";
import cartRouter from "../src/routes/cart";
import BillRouter from "./routes/bill";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api", productRouter);
app.use("/api", usertRouter);
app.use("/api", authtRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", cartRouter);
app.use("/api", BillRouter);

//connect to MongoDB
connectDB(process.env.MONGO_URL);

export const viteNodeApp = app;
