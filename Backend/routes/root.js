import express from 'express';
import userRouter from './userRoutes.js';
import listRouter from './addListRoutes.js';

const rootRouter=express.Router();

rootRouter.use("/user",userRouter);
rootRouter.use("/list",listRouter);

export default rootRouter;