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


app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
