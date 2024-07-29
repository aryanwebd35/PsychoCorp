const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
        members:{
            type: Array
        }
    },
    {
        timestamps: true
    }
);
mongoose.model("Chat",ChatSchema)
