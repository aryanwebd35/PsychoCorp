//jshint esversion:6
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const {MONGOURI} = require('./keys');

mongoose.set('strictQuery', true);
mongoose.connect(MONGOURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected',()=>{
    console.log("Connected");
});
mongoose.connection.on('err',(err)=>{
    console.log("err connecting",err);
});
app.use(
    express.urlencoded({ extended: true })
);
    

 require('./models/user');
 require('./models/doctor');
 require('./models/story');
 require("./models/ChatModel");
 require("./models/MessageModel");
 
 app.use(express.json());
 
 const messageroute =require("./routes/messageroute");
 const chatroute = require("./routes/ChatRoute");

 app.use(require('./routes/auth'));
 app.use(require('./routes/user'));
 app.use(require('./routes/doctor'));
 app.use(require('./routes/story'));
 
 app.use('/chat',chatroute)
 app.use('/message',messageroute) 
app.listen(PORT,()=>{
    console.log("Server is running at port 5000");
});


