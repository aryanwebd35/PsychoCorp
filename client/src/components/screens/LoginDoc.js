  // eslint-disable-next-line
  import React,{useState,useContext}  from "react";
  import {Link,useNavigate} from "react-router-dom";
  import { UserContext } from "../../App";
  import Logo from "../logo";
  import M from "materialize-css"

const LoginDoc=()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();        /*instead of useHistory */
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

  const PostData=()=>{
  
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
        return 
    }
    fetch("/loginDoc",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          password,
          email

      })
  }).then(res=>res.json())
  .then(data=>{
     if(data.error){
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
     }
     else {
      console.log(data)
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      M.toast({html:"success",classes:"#43a047 green darken-1"})
      navigate('/doctor');
      window.location.reload();
     }
  }).catch(err=>{
      console.log(err)
  })
  
    
}
    return (
        <div className="mycard">
         <div className="card auth-card input-field bg-body size">
         <h2 >PsychoCorp</h2>
         <br/><br/>
            <input
            className="ip"
            
            type="text"
            placeholder="Email"  
            value={email}
              onChange={(e)=>setEmail(e.target.value)}          
            />
            
            <input
           className="ip"
            type="password"
            placeholder="Password"
            value={password }
              onChange={(e)=>setPassword(e.target.value)}
            />
           
           <br/><br/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1">
              Login
                 </button>
                   <br/><br/>
            <h5>
                <Link to="/signupDoc">Dont have an account ?</Link>
                <br/>
                <Link to="/docreset">Forgot Password ?</Link>
            </h5>
            </div>
      </div>
    )
}

export default LoginDoc;