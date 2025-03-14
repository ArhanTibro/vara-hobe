import express from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import Message from "../models/Message.js";

const chatRouter = express.Router();

// Send a message
chatRouter.post("/send", authenticateUser, async (req, res) => {
  const { receiver, message } = req.body;

  if (!receiver || !message) {
    return res
      .status(400)
      .json({ message: "Receiver and message are required" });
  }

  try {
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      message,
    });

    await newMessage.save();
    res
      .status(201)
      .json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch messages between two users
chatRouter.get("/messages", authenticateUser, async (req, res) => {
  const { receiver } = req.query;

  if (!receiver) {
    return res.status(400).json({ message: "Receiver is required" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver },
        { sender: receiver, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default chatRouter;
