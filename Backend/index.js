import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Import cors
import { connectDB } from "./config/db.js";
import rootRouter from "./routes/root.js";


dotenv.config();

const app = express();


app.use(cors());



app.use(express.json());

const port = process.env.PORT;


app.use("/api", rootRouter);

const allowedOrigins = [
  "http://localhost:5173", // Frontend running locally
  "http://localhost:4000", // Backend running locally
  "https://www.vara-hobe.com", // Your live domain (SSLCommerz domain)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
