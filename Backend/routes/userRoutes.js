import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import {
  validateSignup,
  validateLogin,
} from "../middlewares/userMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js"; // Authentication middleware
import { getUserProfile } from "../controllers/profileController.js";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.get("/profile", protect, getUserProfile);

export default userRouter;
