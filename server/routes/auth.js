//jshint esversion:6

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Doctor = mongoose.model("Doctor");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../keys");
const requireLogin = require('../middleware/requireLogin');
const requireLoginDoctor = require('../middleware/requireLoginDoctor');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "brute.force.nhv@gmail.com",
        pass: "zgaqbkylxtvygdhs"
    }
})


                              /// User


router.post("/signup", (req, res) => {
    const { name, email, password,pic } = req.body;
    if (!email || !password || !name) {
        res.status(422).json({ error: "please add all the fields" });
    }
    User.findOne({ email: email })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({ error: "user is already exist with the email" });
            }

            bcrypt.hash(password, 12)  //for hashing the password(password will not shows now on database)
            .then(hashedpassword => {

                const user = new User({
                    email,
                    password:hashedpassword,
                    name,
                    pic
                });

                user.save() 
                .then(user => {
                    res.json({ message: "saved Sucessfully" });
                })
                .catch(err => {
                    console.log(err);
                });

            });

        });

});

//Login/Signin
router.post("/login",(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password)
    {
       return  res.status(422).json({error : "please add email and password"});
    }

    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser)
        {
             return res.status(401).json({error : "Invalid email or password"});
        }
        bcrypt.compare(password,saveduser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                // res.json("Sucessfully signed in");
                const token=jwt.sign({_id:saveduser._id},JWT_SECRET); //saving user id to _id 
                const {_id,usertype,name,email,following,pic} = saveduser
                res.json({token,user:{_id,usertype,name,email,following,pic}});
            }
            else
            {
                return res.status(422).json({error : "Invalid email or password"});
            }
        })
        .catch(err=>{
            console.log(err);
        });
    });

});

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"brute.force.nhv@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((result)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

                                        ////// Doctor

router.post("/signupDoc", (req, res) => {
    const { name, email, password,pic,licId,body,type } = req.body;
    if (!email || !password || !name||!licId||!type||!body) {
        res.status(422).json({ error: "please add all the fields" });
    }
    Doctor.findOne({ email: email })
        .then((savedDoctor) => {
            if (savedDoctor) {
                return res.status(422).json({ error: "user is already exist with the email" });
            }

            bcrypt.hash(password, 12)  //for hashing the password(password will not shows now on database)
            .then(hashedpassword => {

                const doctor = new Doctor({
                    licId,
                    name,
                    email,
                    password:hashedpassword,
                    body,
                    specialization :type,
                    pic
                });

                doctor.save() 
                .then(doctor => {
                    res.json({ message: "saved Sucessfully" });
                })
                .catch(err => {
                    console.log(err);
                });

            });

        });

});

//Login/Signin
router.post("/loginDoc",(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password)
    {
       return  res.status(422).json({error : "please add email and password"});
    }

    Doctor.findOne({email:email})
    .then(savedDoctor=>{
        if(!savedDoctor)
        {
             return res.status(401).json({error : "Invalid email or password"});
        }
        bcrypt.compare(password,savedDoctor.password)
        .then(doMatch=>{
            if(doMatch)
            {
                // res.json("Sucessfully signed in");
                const token=jwt.sign({_id:savedDoctor._id},JWT_SECRET); //saving user id to _id 
                const {_id,licId,name,usertype,email,body,specialization,rating ,followers, prevPatients,pic} = savedDoctor
                res.json({token,user:{_id,licId,name,usertype,email,body,specialization,rating,followers, prevPatients,pic}});
            }
            else
            {
                return res.status(422).json({error : "Invalid email or password"});
            }
        })
        .catch(err=>{
            console.log(err);
        });
    });

});

router.post('/docreset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        Doctor.findOne({email:req.body.email})
        .then(doctor=>{
            if(!doctor){
                return res.status(422).json({error:"User don't exists with that email"})
            }
            doctor.resetToken = token
            doctor.expireToken = Date.now() + 3600000
            doctor.save().then((result)=>{
                transporter.sendMail({
                    to:doctor.email,
                    from:"brute.force.nhv@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/docreset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

router.post('/docnew-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    Doctor.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(doctor=>{
        if(!doctor){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           doctor.password = hashedpassword
           doctor.resetToken = undefined
           doctor.expireToken = undefined
           doctor.save().then((result)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;


