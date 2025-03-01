import express from "express";
import { getChat, getChatId } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/:id", getChatId);
chatRouter.get("/", getChat);

export default chatRouter;
