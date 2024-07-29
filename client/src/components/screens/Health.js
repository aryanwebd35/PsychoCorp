  // eslint-disable-next-line
  import React,{useState,useContext}  from "react";
  import {Link,useNavigate} from "react-router-dom";
  import { UserContext } from "../../App";
  import Logo from "../logo";
  import M from "materialize-css"

const Health=()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();        /*instead of useHistory */
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

 
    return (
   <div className="health">
        <div className="log-tag" >
         <Logo/>
            <h2>Healthy</h2>
        </div>
         <div>
           <div className="container user-doc">
              <div className="box">
         
               <Link to="/login"><img  src="https://icon-library.com/images/patient-icon/patient-icon-6.jpg"/></Link>
                  <h6 className="txt">User</h6>
               </div>
              <div className="box">
                 <Link to="/loginDoc"><img  src="https://en.pimg.jp/064/437/887/1/64437887.jpg"/></Link>
                   <h6 className="txt">Doctor</h6>
             </div>
         
           </div>
     

       </div>
          
         
  </div>
 
    )
}

export default Health;