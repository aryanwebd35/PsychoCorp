import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import { Row, Col } from "antd"
import M from "materialize-css"

const Anxiety = () => {
    const [data, setData] = useState([])
    const [commentValue, setcommentValue] = useState("")
    const { state, dispatch } = useContext(UserContext)
    const [doc, setDoc] = useState([])

    useEffect(() => {
        fetch('/getanxiety', {
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
        fetch('/getanxietydoc', {
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
            <div className="add" style={{ backgroundColor: " #666698" }}>
                <div><h2>Anxiety Community Members</h2>
                    <p>Meet your<br />new Community!!</p></div>
                <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo3IIdfQf8ibIeRWtjDdZPj9WHFSG65VQvyfUUYov1pQ&usqp=CAU&ec=48665698" /></div>
            </div>
            <div className="add1">
                <div style={{ width: "500px", paddingLeft: "20px" }}><h4>HELLO.<br />NICE TO<br />MEET YOU</h4></div>
                <div><h5>Peer-to-peer support group for those coping with fear and stress associated with various anxiety disorders.</h5>
                    <p>Anxiety disorders affect about 18% of the adult population, causing them to be filled with fearfulness and uncertainty. Members of the our support groups have found that in addition to professional therapy, sharing stories and meeting others with anxiety can be therapeutic.</p></div>
            </div>
            <div className="add2">
                <div style={{ paddingLeft: "20px" }}><h5>ABOUT ANXIETY.</h5>
                    <p>Some anxiety is normal, but if worries and fears are preventing you from living your life the way you’d like, you may be dealing with an anxiety disorder. According to the National Institute of Mental Health, anxiety disorders affect 40 million Americans a year. And if left untreated can lead to serious physical illness as well.

                        Fortunately, anxiety disorders typically respond well to treatment. Many individuals who seek treatment go on to lead healthy, productive lives. In general, most anxiety disorders are treated with behavioral therapy or counseling, medication, or some combination of the two. In addition, a compassionate and understanding social support network can be instrumental in the recovery of a person with an anxiety disorder.

                        If you think you or a loved one is suffering from an anxiety disorder, consider contacting a mental health professional or anxiety therapist for a complete evaluation.</p></div>
                <div><img style={{ width: "300px", height: "200px", paddingRight: "20px" }} src="https://support.therapytribe.com/wp-content/uploads/2015/07/Social-Anxiety-Full.jpg" />
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

export default Anxiety;
