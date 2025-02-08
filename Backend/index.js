import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

//jAOi4l80lkUvpcaR
dotenv.config();

const app=express();

const port=process.env.PORT;

app.get("/",(req,res)=>{
    res.status(200).json({message: "API is working"});
});

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})