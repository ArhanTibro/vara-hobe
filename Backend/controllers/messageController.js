import dotenv from "dotenv";
import Message from "../models/Message.js";



dotenv.config();

export const sendMessage = async (req, res) => {
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
};

// Fetch messages between two users
export const messages = async (req, res) => {
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
};

export const getRecentContacts = async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID

  try {
    // Find all unique users the authenticated user has interacted with
    const recentContacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $group: {
          _id: null,
          users: {
            $addToSet: {
              $cond: {
                if: { $eq: ["$sender", userId] },
                then: "$receiver",
                else: "$sender",
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Collection name for users
          localField: "users",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: "$userDetails._id",
          username: "$userDetails.username",
          fullName: "$userDetails.fullName",
        },
      },
    ]);

    res.status(200).json(recentContacts);
  } catch (error) {
    console.error("Fetch Recent Contacts Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
