import express from "express";
import userRouter from "./userRoutes.js";
import listRouter from "./addListRoutes.js";
import chatRouter from "./chatRouter.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/list", listRouter);
rootRouter.use("/chat", chatRouter);

export default rootRouter;
