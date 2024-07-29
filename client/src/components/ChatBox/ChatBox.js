import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/MessageRequest";
// import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"
import "./ChatBox.css";
import {addMessage} from "../../api/MessageRequest"

const ChatBox = ({ chat, currentUser ,setSendMessage,recieveMessage}) => {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    useEffect(()=> {
        if(recieveMessage !==null && recieveMessage.chatId === chat._id){
            setMessages([...messages,recieveMessage])
        }
        
    },[recieveMessage])
    //fetching data from header
    useEffect(() => {
        const userid = chat?.members?.find((id) => id !== currentUser);
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setUserData(result)
            })
        // if (chat !== null) userid();  
    }, [chat, currentUser])

    //fetching data for messages 
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)


                setMessages(data)
                console.log(data)

            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) fetchMessages();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId : currentUser,
            text : newMessage,
            chatid:chat._id,
        }

        //sending message to database 
        try {
            const {data}=await addMessage(message);
            setMessages([...messages,data]) //fetching previous message and adding new one
            setNewMessage("")
        } catch (error) { 
            console.log(error);
        }

        // send message to socket server
        const receiverId=chat.members.find((id) => id!==currentUser);
        setSendMessage({...message,receiverId})
    }
    return (

        
        <>
        
            <div className="ChatBox-container">

                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div className="online-dot"></div>
                            <img src={userData?.user?.pic}
                                className="followerImage"
                                style={{ width: "50px", height: "50px" }} />

                            <div className="name" style={{ fontSize: '0.8rem' }}>
                                <span>{userData?.user?.name}</span>

                            </div>

                        </div>
                    </div>

                    <hr
                        style={{ 
                            width: "95%",
                            border: "0.1px solid #ececec",
                            marginTop: "20px",
                        }}
                    />
                </>
            </div>
            {/* chatbox messages */}
            <div className="chat-body">
                {messages.map((message) => (
                    <>
                        {/* giving dynamic classname */}
                        <div className={message.senderId === currentUser ? "message own" : "message"} >
                            <span>{message.text}</span>
                            <span>{message.createdAt}</span>
                        </div>
                    </>
                ))}
            </div>

            {/* chat sender  */}
            <div className="chat-sender">
                
                <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                />
                <div className="send-button button" onClick = {handleSend}>Send</div>
            </div>
        </>
    )
}

export default ChatBox