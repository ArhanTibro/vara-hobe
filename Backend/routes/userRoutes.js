import express from "express";
import {
  signupUser,
  loginUser,
  allUsers,
} from "../controllers/userController.js";

import {
  validateSignup,
  validateLogin,
  protect,
} from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.get("/src", protect, allUsers);
userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);

export default userRouter;
