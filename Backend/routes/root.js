import express from "express";
import userRouter from "./userRoutes.js";
import listRouter from "./addListRoutes.js";
import chatRouter from "./chatRouter.js";
import deepRouter from "./deepRoutes.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/list", listRouter);
rootRouter.use("/chat", chatRouter);
rootRouter.use("/deepai", deepRouter);

export default rootRouter;
