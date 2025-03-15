import express from "express";
import {
  signupUser,
  loginUser,
  searchUsers,
  getProfile,
  getUserById, // Add this import
  rateUser, // Add this import
  searchUserForMessenger,
} from "../controllers/userController.js";
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
userRouter.get("/search", authenticateUser, searchUsers); // Search users by username
userRouter.get("/searchForMessenger", authenticateUser, searchUserForMessenger);
userRouter.get("/profile", authenticateUser, getProfile); // Get logged-in user's profile
userRouter.get("/:userId", authenticateUser, getUserById); // Get another user's profile by ID
userRouter.post("/:userId/rate",  rateUser); // Rate another user

export default userRouter;
