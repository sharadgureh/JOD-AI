const chat = require("../models/chatmodel");
const userchats = require("../models/userchatmodel");

const ChatsController = async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;

    try {
        console.log("User ID:", userId);
        console.log("Text:", text);

        // Create a new chat
        const newChat = new chat({
            userId: userId,
            history: [{ role: "user", parts: [{ text }] }]
        });

        const savedChats = await newChat.save();
        console.log("Saved Chat:", savedChats);

        let userChats = await userchats.findOne({ userId: userId });
        console.log("User Chats Found:", userChats);

        if (!userChats) {
            console.log("No existing user chats, creating new.");
            const newUserChats = new userchats({
                userId: userId,
                chats: [
                    {
                        _id: savedChats._id,
                        title: text.substring(0, 40),
                    }
                ]
            });
            await newUserChats.save();
        } else {
            console.log("Updating existing user chats.");
            await userChats.updateOne(
                { userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChats._id,
                            title: text.substring(0, 40),
                        }
                    }
                }
            );
        }

        res.status(200).send(newChat._id);
    } catch (error) {
        console.error("Error during chat creation:", error);
        res.status(500).json({
            success: false,
            message: "Error creating chat",
            error: error.message
        });
    }
};

module.exports = ChatsController;
