import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";

/* ================================
   GET USERS FOR SIDEBAR
================================ */
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("fullName profilePic email lastSeen");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/* ================================
   GET MESSAGES BETWEEN 2 USERS
================================ */
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
      isDeleted: false,
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/* ================================
   SEND MESSAGE
================================ */
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({
        message: "Message must contain text or image.",
      });
    }

    let attachment = null;

    // Upload image if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      attachment = {
        url: uploadResponse.secure_url,
        type: "image",
      };
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content: {
        text: text || "",
        attachments: attachment ? [attachment] : [],
      },
      status: "sent",
    });

    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
