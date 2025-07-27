const io = require("socket.io")(8800, {
    cors: {
        origin: 'https://psychocorp-client-1.onrender.com',
        methods: ["GET", "POST"],
        credentials:true,
        transports: ['websocket', 'polling']
        
    },
    allowEIO3:true
  });
//   header('Access-Control-Allow-Credentials: true');

let activeUsers = [] //list of active user

io.on("connection", (socket) => {


    //add new user in socket server
    //newUserId taking from react client side
    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.user_id === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("connected User" , activeUsers);
        //sending the data to the react client side using emit
        // we will get the data into the client side using get-users
        // idhar io.emit use kiya send ke liye ,client side mei isko lene ke liye socker.on use krege
        io.emit("get-users",activeUsers)
    })

    //send message 
    socket.on("send-message",(data) => {
        const {receiverId} = data;
        const user = activeUsers.find((user)=> user.userId === receiverId)//searching the receiver inside active users 
        console.log("Sending from socket to :",receiverId);
        console.log("Data",data);
        if(user){
            io.to(user.socketId).emit("receive-message", data)
        }
    })   

   socket.on("disconnect",()=>{
    activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
    console.log("User Disconnected" , activeUsers);
   })
})
console.log("hello");
