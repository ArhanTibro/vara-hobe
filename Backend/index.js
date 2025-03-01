import express from "express";
import dotenv from "dotenv";
import cors from "cors";  
import { connectDB } from "./config/db.js";
import rootRouter from "./routes/root.js";

dotenv.config();

const app = express();

// Use the single ALLOWED_ORIGIN value from .env
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api", rootRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
