import express from 'express';
import { signupUser, loginUser } from '../controllers/userController.js';
import { validateSignup, validateLogin } from '../middlewares/userMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', validateSignup, signupUser);
userRouter.post('/login', validateLogin, loginUser);

export default userRouter;


