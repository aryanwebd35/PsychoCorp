import React ,{useState,useEffect,useRef} from "react";
import {Link,useNavigate} from "react-router-dom"
import M from "materialize-css"
import Logo from "../logo";
const SignupDoc=()=>{

    const navigate = useNavigate();        /*instead of useHistory */
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [body,setBody]=useState("")
    const [licId,setlicId]=useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [type, setType] = useState("")
    const typeselect = useRef(null)
    useEffect(() => {
      M.FormSelect.init(typeselect.current)
    }, [])
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file", image)   
        data.append("upload_preset", "zaayka")
        data.append("cloud_name", "dkp8phxth") 
        fetch("https://api.cloudinary.com/v1_1/dkp8phxth/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signupDoc",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                licId,
                email,
                password,
                body,
                type ,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               navigate('/loginDoc')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    return  (
        <div className="mycard">
 <div className="card auth-card input-field bg-body">
              
            <h2>PsychoCorp</h2>
              <input
              className="ip"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              />
             <input
            className="ip"
            
            type="text"
            placeholder="License Id"  
            value={licId}
              onChange={(e)=>setlicId(e.target.value)}          
            />
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
            <input
             className="ip"
        type="text"
        placeholder="Bio"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="input-field col s12">
        <select ref={typeselect} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled defaultValue>specialization </option>
          <option value="1">Addiction</option>
          <option value="2">Anxiety</option>
          <option value="3">Depression</option>
          <option value="4">HIV/AIDS</option>
          <option value="5">Marriage/Family</option>
          <option value="6">OCD</option>
          <option value="7">Teen</option>
          <option value="8">LGBTQ</option>
        </select>
      </div>
                <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
              <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue darken-1">              
                  SignUP
              </button>
              <h5>
                  <Link to="/loginDoc">Already have an account ?</Link>
              </h5>
   
          </div>
        </div>
     )

}

export default SignupDoc;