import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from "react-router-dom"
import Home from "./components/screens/Home"
import Doctor from "./components/screens/Doctor"
import Health from "./components/screens/Health"
import SignIn from "./components/screens/Login"
import LoginDoc from "./components/screens/LoginDoc"
import Profile from "./components/screens/Profile"
import UserProfile from './components/screens/UserProfile'
import DoctorProfile from './components/screens/DoctorProfile'
import SignUp from "./components/screens/Signup"
import SignUpDoc from "./components/screens/SignupDoc"
import {reducer,initialState} from './reducers/userReducer'
import Reset from './components/screens/Reset';
import DocReset from './components/screens/DocReset';
import NewPassword from './components/screens/NewPassword';
import DocNewPassword from './components/screens/DocNewPassword';
import Addiction from './components/screens/Addiction';
import Anxiety from './components/screens/Anxiety';
import Depression from './components/screens/Depression';
import Hiv from './components/screens/Hiv';
import Family from './components/screens/Family';
import Ocd from './components/screens/Ocd';
import Teen from './components/screens/Teen';
import Lgbtq from './components/screens/Lgbtq';
import CreateSuccess from './components/screens/CreateSuccess';
import Footer from './components/Footer';
import Chat from "./components/screens/Chat"
export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const location = useLocation()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      console.log(state)
      console.log(user)
      console.log(user.usertype)
      dispatch({type:"USER",payload:user})
    }else{
      if(!location.pathname.startsWith('/reset') &&!location.pathname.startsWith('/docreset' ))
      navigate("/health")
    }
  },[])
  return(
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/doctor" element={<Doctor />} />
        <Route exact   path="/loginDoc" element={<LoginDoc />} />
        <Route exact path="/signupDoc" element={<SignUpDoc />} />
        <Route exact path="/doctorprofile/:docid" element={<DoctorProfile />} /> 
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/health" element={<Health />} />
        <Route exact  path="/profile" element={<Profile />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile/:userid" element={<UserProfile />} /> 
        <Route exact path="/reset" element={<Reset />} />

        <Route path="/reset/:token" element={<NewPassword />} /> 
        <Route path="/addiction" element={<Addiction/>}/>
        <Route path="/anxiety" element={<Anxiety/>}/>
        <Route path="/depression" element={<Depression/>}/>
        <Route path="/hiv" element={<Hiv/>}/>
        <Route path="/family" element={<Family/>}/>
        <Route path="/ocd" element={<Ocd/>}/>
        <Route path="/teen" element={<Teen/>}/>
        <Route path="/lgbtq" element={<Lgbtq/>}/>
        <Route path="/createSuccess" element={<CreateSuccess/>}/>
        <Route path="/docreset" element={<DocReset/>}/>
        <Route path="/docreset/:token" element={<DocNewPassword/>}/>
        <Route path="/chat" element={<Chat /> } /> 

        <Route exact path="/reset/:token" element={<NewPassword />} /> 
        <Route exact path="/addiction" element={<Addiction/>}/>
        <Route exact path="/anxiety" element={<Anxiety/>}/>
        <Route exact path="/depression" element={<Depression/>}/>
        <Route exact path="/hiv" element={<Hiv/>}/>
        <Route exact path="/family" element={<Family/>}/>
        <Route exact path="/ocd" element={<Ocd/>}/>
        <Route exact path="/teen" element={<Teen/>}/>
        <Route exact path="/lgbtq" element={<Lgbtq/>}/>
        <Route exact path="/createSuccess" element={<CreateSuccess/>}/>
        <Route exact path="/docreset" element={<DocReset/>}/>
        <Route exact path="/docreset/:token" element={<DocNewPassword/>}/>

    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />  
      <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  );
}



export default App;
