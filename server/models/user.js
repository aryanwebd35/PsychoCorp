//jshint esversion:6
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    usertype:{
   type:Number,
   default:0
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dkp8phxth/image/upload/v1674930387/person1_f1sx2q.png"
       },
    following:[{type:ObjectId,ref:"User"}],
    resetToken : String,
    expireToken : Date
});

mongoose.model("User",userSchema);

