import express from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import { deepseekCall } from "../controllers/deepseekController.js";

const deepRouter = express.Router();

deepRouter.post("/prompt", deepseekCall);

export default deepRouter;
