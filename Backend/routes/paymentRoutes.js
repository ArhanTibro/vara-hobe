import express from "express";
import {
  generateSslPayment,
  successPayment,
  failPayment,
  cancelPayment,
} from "../controllers/paymentController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const payRouter = express.Router();

payRouter.post("/generate/:listId", authenticateUser, generateSslPayment);
payRouter.get("/success/:tranId", successPayment);
payRouter.get("/fail/:tranId", failPayment);
payRouter.get("/cancel/:tranId", cancelPayment);

export default payRouter;

