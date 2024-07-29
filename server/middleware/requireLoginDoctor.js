//jshint esversion:6
const { JWT_SECRET } = require("../keys");
const jwt=require("jsonwebtoken");
const mongoose =require('mongoose');
const Doctor=mongoose.model("Doctor");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers; //Bearer lkdfjkljffls  (authorization will look like)
    
    if(!authorization) 
    {
        return res.status(401).json({error :"You must be logged in "});
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({error :"You must be logged in "});
        }
        const {_id}=payload;
        Doctor.findById(_id).then(doctordata=>{
            req.user=doctordata;
            next();
        });
        
    });

}; 