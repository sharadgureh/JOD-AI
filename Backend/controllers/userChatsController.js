const userchats = require("../models/userchatmodel");

const userChatsController = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const userChats = await userchats.find({ userId });

        if (userChats.length === 0) {
                
            return res.status(200).send([]); 
        }

        const chats = userChats[0].chats || [];
        res.status(200).send(chats);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching chats",
            error: error.message
        });
    }
};

module.exports = userChatsController;
