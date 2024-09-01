const mongoose = require('mongoose');
const chat = require("../models/chatmodel");
const userchats = require("../models/userchatmodel");

const singleUserChatController = async (req, res) => {
    const userId = req.auth.userId;

    try {
        // Validate and convert req.params.id to ObjectId
        const chatId = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : null;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Invalid chat ID"
            });
        }

        const chats = await chat.findOne({ _id: chatId, userId });

        if (!chats) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        res.status(200).send(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching chat",
            error: error.message
        });
    }
};

module.exports = singleUserChatController;
