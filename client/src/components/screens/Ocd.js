import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import { Row, Col } from "antd"
import M from "materialize-css"

const Ocd = () => {
  const [data, setData] = useState([])
  const [commentValue, setcommentValue] = useState("")
  const { state, dispatch } = useContext(UserContext)
  const [doc, setDoc] = useState([])

  useEffect(() => {
    fetch('/getocd', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        setData(result.stories)
      })
  }, [])

  useEffect(() => {
    fetch('/getocddoc', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setDoc(result.doctors)
      })
  }, [])

  const likePost = (id) => {
    fetch('/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          }
          else {
            return item;
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {

        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          }
          else {
            return item;
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          }
          else {
            return item;
          }
        })
        setData(newData)
        setcommentValue("")
      }).catch(err => {
        console.log(err)
      })
  }

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.filter(item => {
          return item._id !== result._id
        })
        setData(newData)
      })
  }
  return (
    <div>
      <div className="add" style={{ backgroundColor: "#8cc63f" }}>
        <div><h2>OCD Community Members</h2>
          <p>Meet your<br />new Community!!</p></div>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23hyiTlPLyZsgvBOTfB-nKEoMmbV3nLLs_m3wcgZWpA&usqp=CAU&ec=48665698" /></div>
      </div>
      <div className="add1">
        <div style={{ width: "500px", paddingLeft: "20px" }}><h4>HELLO.<br />NICE TO<br />MEET YOU</h4></div>
        <div><h5>Peer-to-peer support group for those facing daily thoughts and compulsions from an obsessive compulsive disorder.</h5>
          <p>Obsessive Compulsive Disorder (OCD) can be a life consuming disorder. Many don’t know there are millions of others that struggle with daily obsessions and compulsions. While medication and/or therapy are an important part of managing OCD, many find sharing with others can make daily challenges a little more manageable.</p></div>
      </div>
      <div className="add2">
        <div style={{ paddingLeft: "20px" }}><h5>ABOUT OCD.</h5>
          <p>Obsessive-compulsive disorder is a brain disorder that affects more than 2% of the population (1 out of 40 people). Individuals with OCD perform excessive and repetitive behaviors (compulsions) in order to provide temporarily relief from the stress brought on by an unwanted thought or feeling (obsession). Often the person recognizes their behaviors as irrational, but still feels unable to resist. A few examples of compulsions include excessive hand washing, recounting, straightening, and checking. Symptoms usually begin gradually and vary throughout life.

            OCD has been shown to respond well to psychotherapy as well as medication. Specifically, cognitive-behavioral therapy (CBT) and exposure therapy have the most research supporting their effectiveness. It’s normal, on occasion to double-check if the stove is off, or to be concerned about the well-being of others. But if these thoughts or behaviors become excessive and begin to interfere with your ability to lead a normal life, it may be time to get help.</p></div>
        <div><img style={{ width: "300px", height: "200px", paddingRight: "20px" }} src="https://support.therapytribe.com/wp-content/uploads/2016/06/Obsessive-Compulsive-Disorder-Full-1038x693.jpg" />
          <br />

        </div>
      </div>
      <hr />
      <div>
        <Row justify="center mt-1" gutter={16}>
          {doc.map((doctor) => {
            return (
              <Col lg={5} sm={24} xs={24}>
              <Link to={ "/doctorprofile/"+doctor._id}><div className="car p-2 bs1 mt-3">
                  <div><img style={{ borderRadius: "50%", width: "200px", paddingLeft: "50px" }} src={doctor.pic} alt="a doctor" className="carimg" /></div>

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div>
                      <p className="pa" align="center">{doctor.name}</p>
                      <p className="pa" align="center">{doctor.body}</p>
                    </div>
                  </div>
                </div></Link>
              </Col>
            );
          })}
        </Row>
      </div>
      <hr />
      <h3 style={{ textAlign: "center" }}>SUCCESS STORIES THAT MAY INSPIRE YOU!!</h3>

      <div className="home">
        {
          data.map(item => {
            return (

              <div className="card home-card" key={item._id}>
                <h5><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"} >{item.postedBy.name}</Link> {item.postedBy._id == state._id
                  && <i className="material-icons" style={{
                    float: "right"
                  }}
                    onClick={() => deletePost(item._id)}
                  >delete</i>
                }</h5>
                <div className="card-image">
                  <img src={item.photo} alt={item.title} />
                </div>
                <div className="card-content">
                  <i className="material-icons" style={{ color: "red" }}>favorite</i>
                  {item.likes.includes(state._id)
                    ?
                    <i className="material-icons" onClick={() => { unlikePost(item._id) }}>thumb_down</i>
                    :
                    <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                  }
                  <h6>{item.likes.length} likes</h6>
                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                  {
                    item.comments.map(record => {
                      return (
                        <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name} </span>{record.text}</h6>
                      )
                    })
                  }
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
                  }}>
                    <input value={commentValue} onChange={(e) => setcommentValue(e.target.value)} type="text" placeholder="add a comment" />
                  </form>
                </div>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default Ocd
