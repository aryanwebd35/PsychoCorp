import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import M from 'materialize-css';

const CreateSuccess = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState("")
  const typeselect = useRef(null)
  useEffect(() => {
    M.FormSelect.init(typeselect.current)
  }, [])
  
  useEffect(() => {
    if (url) {
      fetch("/createstory", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          type,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" })
          }
          else {
            M.toast({ html: "Story created successfully", classes: "#00e676 green accent-3" })
            navigate('/')
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

  }, [url])
  const storyDetails = () => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "zaayka")
    data.append("cloud_name", "dkp8phxth")             
    fetch("https://api.cloudinary.com/v1_1/dkp8phxth/image/upload", {    /**"https://api.cloudinary.com/v1_1/zaayka" - api base url   */
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })



  }
  return (
    <div className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <input
        type="text"
        placeholder="Story Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Story Description"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
          <span>Upload Photo</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <div className="input-field col s12">
        <select ref={typeselect} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled defaultValue>Choose Category</option>
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
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => storyDetails()}>
        Share success!!
      </button>
    </div>
  )

}

export default CreateSuccess;