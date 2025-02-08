import express from 'express';
import userRouter from './userRoutes.js';

const rootRouter=express.Router();

rootRouter.use("/user",userRouter);

export default rootRouter;