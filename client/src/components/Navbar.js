import React, { useContext,useRef,useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom"; //from going from one page to another page ,page will not refresh now ,it goes directly on that page without refreshing (😇)
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {
  const [search,setSearch] = useState('')
  const [doctorDetails,setdoctorDetails] = useState([])
  const  searchModal = useRef(null)
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList = () => {
    if (state) {
      if(state.usertype==0){
       
        return [
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
          <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/createSuccess">Create Success Story</Link></li>,
        <li key="8"><Link to="../chat"> <i className="material-icons">chat</i> </Link></li>,
          <li key="4">
            <button className="btn #c62828 red darken-3"
              onClick={() => {
                localStorage.clear()
                dispatch({ type: "CLEAR" })
                navigate('/health')
                window.location.reload();
              }}>
              Logout
            </button>
          </li>
        ]
      }
      else{
       
        return [
          
          // <li key="2"><Link to="/profile/doctor">Profile</Link></li>,
          <li key="3"><Link to="/paitent">upcoming paitent</Link></li>,
          <li key="4"><Link to="/my ">Prev paitents</Link></li>,
          <li key="5"><Link to="../chat"> <i className="material-icons">chat</i> </Link></li>,
          <li key="6">
            <button className="btn #c62828 red darken-3"
              onClick={() => {
                localStorage.clear()
                dispatch({ type: "CLEAR" })
                navigate('/health')
                window.location.reload();
              }}>
              Logout
            </button>
          </li>
        ]
      }
      
    } 
    else{
      return [
      
        <li key="2"><Link to="/login">User</Link></li>,
        <li key="3"><Link to="/loginDoc">Doctor</Link></li>        
      ]
    }
  }

  const fetchDoctors = (query)=>{
    setSearch(query)
    fetch('/search-doctor',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      console.log(results)
      setdoctorDetails(results.doctor)
    })
 }



  return (
    <nav>
      <div className="nav-wrapper white">
      
        <Link to={state ? state.usertype==1?"/doctor":"/": "/health"} className="brand-logo">
         PsychoCorp
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search doctors"
            value={search}
            onChange={(e)=>fetchDoctors(e.target.value)}
            />
             <ul className="collection">
             {doctorDetails.map(item=>{
                 return <Link to={ "/doctorprofile/"+item._id} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.name}</li></Link> 
               })}
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;