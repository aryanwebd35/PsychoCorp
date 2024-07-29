const express = require("express"); 
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin=require("../middleware/requireLogin");
const Story=mongoose.model("Story");

//Create new story 
router.post("/createstory",requireLogin,(req,res)=>{
    const {title,body,pic,type}=req.body;
    if(!title || !body || !pic || !type )
    {
        return res.status(422).json({error :"Please add all the fields"});
    }
      req.user.password=undefined    // to remove the password from post
     
    const story=new Story({
        title,
        body,
        photo:pic,
        category:type,
        postedBy:req.user
    })

    story.save().then(result=>{
        res.json({story:result})
    })
    .catch(err=>{
        console.log(err)
    });
   
});

//for all stoies
router.get("/allstory",requireLogin,(req,res)=>{
    Story.find()                         //finding all posts  without any condition
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")  //   showing _id and name in postedBy
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories:stories})   
    })
    .catch(err=>{
        console.log(err)
    })
})
//  my uploaded stories
router.get("/mystory",requireLogin,(req,res)=>{  
    Story.find({postedBy: req.user._id})  
    .populate("postedBy","_id name")  //it will expand only _id and name
    .then(mystory=>{
        res.json({mystory})
    })
    .catch(err=>{
        console.log(err)
    })
})

//like a story
router.put('/like',requireLogin,(req,res)=>{
    Story.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
    },{
      new :true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
    })
})

//Unlike a story
router.put('/unlike',requireLogin,(req,res)=>{
    Story.findByIdAndUpdate(req.body.postId,{
      $pull:{likes:req.user._id}
    },{
      new :true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
    })
})

//Comment on a story
router.put("/comment",requireLogin,(req,res)=>{
    const comment={
     text:req.body.text,
     postedBy:req.user._id
    }
    Story.findByIdAndUpdate(req.body.postId,{
         $push:{comments:comment}
     },{
         new:true
     })
     .populate("comments.postedBy","_id name")
     .populate("postedBy","_id name")
     .exec((err,result)=>{
         if(err){
             return res.status(422).json({error:err})
         }else{
             res.json(result)
         }
     })
  })

  //delete story
  router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Story.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
  })

  //get addiction success stories
router.get('/getaddiction',requireLogin,(req,res)=>{         
    Story.find({ category:1})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get anxiety success stories
router.get('/getanxiety',requireLogin,(req,res)=>{         
    Story.find({ category:2})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get depression success stories
router.get('/getdepression',requireLogin,(req,res)=>{         
    Story.find({ category:3})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get hiv success stories
router.get('/gethiv',requireLogin,(req,res)=>{         
    Story.find({ category:4})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get family success stories
router.get('/getfamily',requireLogin,(req,res)=>{         
    Story.find({ category:5})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get ocd success stories
router.get('/getocd',requireLogin,(req,res)=>{         
    Story.find({ category:6})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get teen success stories
router.get('/getteen',requireLogin,(req,res)=>{         
    Story.find({ category:7})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

//get lgbtq success stories
router.get('/getlgbtq',requireLogin,(req,res)=>{         
    Story.find({ category:8})          
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(stories=>{
        res.json({stories})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router;