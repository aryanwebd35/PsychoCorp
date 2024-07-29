import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import { Row, Col } from "antd"
import M from "materialize-css"

const Teen = () => {
    const [data, setData] = useState([])
    const [commentValue, setcommentValue] = useState("")
    const { state, dispatch } = useContext(UserContext)
    const [doc, setDoc] = useState([])

    useEffect(() => {
        fetch('/getteen', {
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
            <div className="add" style={{ backgroundColor: "#f05928" }}>
                <div><h2>Teen Community Members</h2>
                    <p>Meet your<br />new Community!!</p></div>
                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hf6YzlD2klnCxIE60DUOZBhgymD3qW9q3f_nQscABw&usqp=CAU&ec=48665698" /></div>
            </div>
            <div className="add1">
                <div style={{ width: "500px", paddingLeft: "20px" }}><h4>HELLO.<br />NICE TO<br />MEET YOU</h4></div>
                <div><h5>Peer-to-peer support group for teens faced with mental health challenges and/or difficult family dynamics.</h5>
                    <p>During the teenage years striking changes take place in the body as well as the brain. Youth are particularly vulnerable to mental health challenges including – depression, anxiety, ADHD, self-harm, eating disorders and more.</p></div>
            </div>
            <div className="add2">
                <div style={{ paddingLeft: "20px" }}><h5>ABOUT TEENS.</h5>
                    <p>Some adolescent behaviors are completely normal such as: attention seeking, motivation due to peer-pressure and risk-taking behavior. However, it is important to be aware the signs of a mental health disorders.

                        Brain maturation does not set in until the early 20’s. The stress and pressure that is placed on today’s youth put them at risk for a variety of mental health disorders including: depression, anxiety, ADHD, self-harm, eating disorders and more. Additionally, drug and alcohol abuse in the teenage years can lead to negative changes in a still developing brain.

                        Positive mental health is a key tool today’s youth have to combat the many challenges they face. It is critical they become #mentalhealthliterate and learn to distinguish normal teenage behavior from a more serious mental disorders. If you suspect you, or a friend is facing a mental health challenge seek help. The sooner a problem is addressed, the more effective the treatment can be.</p></div>
                <div><img style={{ width: "300px", height: "200px", paddingRight: "20px" }} src="https://support.therapytribe.com/wp-content/uploads/2016/06/LGBT-Teen-Full.jpg" />
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

export default Teen
