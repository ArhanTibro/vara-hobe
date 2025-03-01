import express from "express";
import { initiatePayment } from "../controllers/paymentController.js";

const payRouter = express.Router();
payRouter.post("/initiate", initiatePayment);

export default payRouter;
