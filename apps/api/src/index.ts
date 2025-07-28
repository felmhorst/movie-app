import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import moment from "moment";
import mongoose from "mongoose";
import watchlistRoutes from "./entities/watchlist/watchlist.routes";
import historyRoutes from "./entities/history/history.routes";

dotenv.config();


const DB_URL: string = process.env.DB_URL ?? "mongodb://localhost:27017/test";
const PORT: number = 5000;
const app = express();

const corsConfig = {
    origin: "*"
};
app.use(cors(corsConfig));

app.use("/watchlist", watchlistRoutes);
app.use("/history", historyRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});