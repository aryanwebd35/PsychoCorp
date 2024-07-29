var mongoose = require("mongoose");
// const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
    {
        chatId :{
            type : String,
        },
        senderId : {
            type : String
        },
        text : {
            type : String ,
        },
    },
    {
        timestamps : true,
    }
)
mongoose.model("Message",MessageSchema)

