import express from "express";
import {
  signupUser,
  loginUser,
  searchUsers,
} from "../controllers/userController.js"; // Import searchUsers
import {
  validateSignup,
  validateLogin,
  authenticateUser,
} from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);

// Protected routes (require authentication)
userRouter.get("/search", authenticateUser, searchUsers); // Add search route

export default userRouter;
