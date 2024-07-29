//jshint esversion:6
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const doctorSchema = new mongoose.Schema({
    licId: {
        // doctor's license id
        type: String,
        unique: true,
        required: true,
      },
    usertype:{
        type:Number,
        default:1
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
    body: {
        type: String,
        default : "i am a doctor"
      },
      rating :{
        type: Number,
        default:1
      },
      totalRating : {
        type: Number,
        default:0
      },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dkp8phxth/image/upload/v1674930387/person1_f1sx2q.png"
       },
    followers:[{type:ObjectId,ref:"User"}],
    prevPatients: [{ type: String }],
    specialization : {
        type: Number,
        required: true
      },
    resetToken : String,
    expireToken : Date
});

mongoose.model("Doctor",doctorSchema);

