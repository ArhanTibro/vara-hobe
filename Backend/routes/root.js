import express from 'express';
import userRouter from './userRoutes.js';
import listRouter from './addListRoutes.js';
import payRouter from './paymentRoutes.js';

const rootRouter=express.Router();

rootRouter.use("/user",userRouter);
rootRouter.use("/list",listRouter);
rootRouter.use("/payment",payRouter);

export default rootRouter;