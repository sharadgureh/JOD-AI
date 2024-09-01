const express = require('express')
const Router=express.Router()
const ChatsController = require("../controllers/ChatsController")
const AuthController = require("../controllers/AuthController")
const { ClerkExpressRequireAuth } =require('@clerk/clerk-sdk-node')
const userChatsController = require('../controllers/userChatsController')
const singleUserChatController = require("../controllers/singleUserChatController")


Router.get("/upload",AuthController);
Router.get('/chats/:id',ClerkExpressRequireAuth(),singleUserChatController)
Router.post("/chats",ClerkExpressRequireAuth(),ChatsController)
Router.get('/userchats',ClerkExpressRequireAuth(),userChatsController)

module.exports=Router