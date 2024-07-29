//jshint esversion:6
const express = require("express"); 
const router = express.Router();
const mongoose = require('mongoose');
const requireLoginDoc = require("../middleware/requireLoginDoctor");
const requireLogin = require("../middleware/requireLogin");

const Doctor = mongoose.model("Doctor");
const User = mongoose.model("User");

///unfollow the doctor
router.put('/unfollow',requireLogin,(req,res)=>{
    Doctor.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result1)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result2=>{
          res.json({result1,result2})
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
/// user follow the doctor
router.put('/follow',requireLogin,(req,res)=>{
    Doctor.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result1)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result2=>{
          res.json({result1,result2})
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
/// doctor profile when user click on doctor information
router.get('/doctorprofile/:id',requireLoginDoc,(req,res)=>{      // here we get the "id" of the user along with url , whose profile we want to see
    Doctor.findOne({_id:req.params.id})                   // query to find the user using "id" in "User" db
    .select("-password")                                   // select all the field except password
    .then(doctor=>{
          res.json(doctor)
         
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

//search the doctor
router.post('/search-doctor',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    Doctor.find({name:{$regex:userPattern}})
    .select("-password")
    .then(doctor=>{
        res.json({doctor})
    }).catch(err=>{
        console.log(err)
    })

})
// updating doc pic
router.put('/doc/updatepic',requireLoginDoc,(req,res)=>{
    Doctor.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic cannot post"})
         }
         res.json(result)
    })
})

//rate the doctor
router.put('/rating',requireLogin,(req,res)=>{
    Doctor.findByIdAndUpdate(req.body.docid,{$set:{rating:req.body.rate,totalRating :req.body.n}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic cannot post"})
         }
         res.json(result)
    })
})

//get addiction doctors
router.get('/getaddictiondoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:1})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get anxiety doctors
router.get('/getanxietydoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:2})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get depression doctors
router.get('/getdepressiondoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:3})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

// get hiv doctors
router.get('/gethivdoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:4})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get family doctors
router.get('/getfamilydoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:5})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get ocd doctors
router.get('/getocddoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:6})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get teen doctors
router.get('/getteendoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:7})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})

// get lgbtq doctors
router.get('/getlgbtqdoc',requireLogin,(req,res)=>{         
    Doctor.find({ specialization:8})          
    .select("-password")
    .then(doctors=>{
        res.json({doctors})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router; 