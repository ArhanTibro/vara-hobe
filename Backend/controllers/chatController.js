import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { chats } from "../data/data.js";

export const getChat = (res, req) => {
  const id = req.body;
  try {
    res.send(id);
  } catch (e) {
    console.log("Error");
  }
};

export const getChatId = (res, req) => {
  const id = req.body;
  try {
    const signleChat = chats.find((user) => user._id === req.params.id);
    res.send(id);
  } catch (e) {
    console.log("Error");
  }
};
