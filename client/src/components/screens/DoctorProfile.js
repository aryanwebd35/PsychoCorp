import React,{useEffect,useState,useContext}  from "react";
import { UserContext } from "../../App";
import {Params, useParams} from "react-router-dom";

const Profile=()=>{
    const [docProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {docid} = useParams()
    const [rating,setRating]=useState()
    const [num,setNum]=useState()
    const [showfollow,setShowFollow] = useState(true)
    // console.log(docid)
    useEffect(()=>{
        fetch(`/doctorprofile/${docid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
            setRating(result.rating)
            setNum(result.totalRating)
        })
    },[state,rating])     /// debug here we use to debug loading error without it it not showing proper doctorprofile 

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:docid
            })
        }).then(res=>res.json())
        .then(data=>{
        
        console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.result2.following}})
             localStorage.setItem("user",JSON.stringify(data.result2))
            setProfile(data.resutl1) 
             setShowFollow(false)
        })
    }
    const giverating= (rate,n)=>{
        fetch('/rating',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                docid,
                rate,
                n
            })
        }).then(res=>res.json())
        .then(data=>{
        
        console.log(data)
            setProfile(data)
            setRating(data.rating) 
             setNum(data.totalRating)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:docid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.result2.following}})
             localStorage.setItem("user",JSON.stringify(data.result2))
            
            setProfile(data.result1)
             setShowFollow(true)
             
        })
    }

    return (
        <>
        {docProfile? 
            <div>
     <div style={{ height:"400px", 
backgroundColor:"rgba(131, 217, 231, 0.1)",

    margin: "0px auto" 
    }}
>

        <div style={{  //for upper div(dp and name)
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0px",
         maxWidth:"55"
        }}>

            {/* dp part */}
            <div>
                <img style={{ width: "200px", height: "200px", borderRadius: "200px", marginLeft:"20p",textAlign:"center" }}
                    src={docProfile?docProfile.pic:"loading.."}
                />

                {/* name part */}
            </div>
            <div style={{marginRight:"400px" }} >
                <h4>Dr {docProfile ? docProfile.name : "loading"}</h4>
                <h4>Psychiatric social workers.</h4>
                <h5>{docProfile ? docProfile.email : "loading"}</h5>
                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                {/* <h6>{mypics.length} recipes</h6> */}
                       <h6>{docProfile?docProfile.followers.length:"0"} followers</h6>
                       {showfollow?
                     <button style={{
                         margin:"10px"
                     }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                      onClick={()=>followUser()}
                      >
                          Follow
                      </button>
                      : 
                      <button
                      style={{
                          margin:"10px"
                      }}
                      className="btn waves-effect waves-light #64b5f6 blue darken-1"
                      onClick={()=>unfollowUser()}
                      >
                          UnFollow
                      </button>

                      }
                      <h6>Current Rating {rating?rating:1}</h6>
                      <button style={{
                         margin:"10px"
                     }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                      onClick={()=>giverating((rating*num+4)/num,num+1)}
                      >
                          Rate the  Doctor
                      </button>
                      
                </div>
            </div>
        </div>       
    </div>
    <div style={{ height:"200px", 
backgroundColor:" rgb(252, 191, 226)",
margin:"auto 100px"
   
    }}>
    <div style={{ 
        
    marginLeft:"80px" ,
    maxWidth:"800px",

    }}>
  
    <h5 style={{margin:"20px auto"}}>Bio</h5>
    
     <h6>{docProfile ? docProfile.body : "loading"}</h6>

    </div>
    </div>
   </div>
        
      :<h2>loading</h2>}
       
</>
    )
}

export default Profile;
