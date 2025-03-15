import express from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import {
  getRecentContacts,
  messages,
  sendMessage,
} from "../controllers/messageController.js";

const chatRouter = express.Router();

chatRouter.get("/messages", authenticateUser, messages);
chatRouter.post("/send", authenticateUser, sendMessage);
chatRouter.get("/recent-contacts", authenticateUser, getRecentContacts);

export default chatRouter;
