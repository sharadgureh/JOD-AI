const mongoose= require("mongoose")
require('dotenv').config()

const Dbconnection= async ()=>
{
        try {
         await mongoose.connect(process.env.DATABASE_URL)
          .then(()=>{console.log("database connection successfully")})
        } catch (error) {
                console.error(error.message)
        }
}
module.exports=Dbconnection
