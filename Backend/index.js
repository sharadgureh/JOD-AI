const express= require("express");
const ImageKit = require("imagekit");
const Dbconnection = require("./Dbconfig/Dbconfig")
const cors=require("cors");
const Router = require("./routes/route");
const ChatsController = require("./controllers/ChatsController");
const app=express()
require("dotenv").config()
app.use(cors({
        origin:process.env.CLIENT_URL,
        credentials:true
}))
app.use(express.json())
Dbconnection()
const port=process.env.PORT || 4000
app.use('/api',Router)


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(401).send('Unauthenticated!')
})


app.listen(port,()=>{
        console.log(`server is running on ${port}`)
})