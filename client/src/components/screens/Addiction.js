import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import {Row,Col} from "antd"
import M from "materialize-css"

const Addiction = () => {
    const [data, setData] = useState([])
    const [commentValue, setcommentValue] = useState("")
    const { state, dispatch } = useContext(UserContext)
    const [doc, setDoc] = useState([])

    useEffect(() => {
        fetch('/getaddiction', {
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
        fetch('/getaddictiondoc', {
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
            <div className="add">
                <div><h2>Addiction Community Members</h2>
                    <p>Meet your<br />new Community!!</p></div>
                <div><img src="https://img.freepik.com/free-photo/addiction-pills-cigarettes_23-2148585918.jpg" /></div>
            </div>
            <div className="add1">
                <div style={{ width: "500px", paddingLeft: "20px" }}><h4>HELLO.<br />NICE TO<br />MEET YOU</h4></div>
                <div><h5>Peer-to-peer support group for individuals and loved ones in the process of on-going addiction recovery.</h5>
                    <p>For many, recovery from addiction is a daily struggle. Traditional treatment methods are only a part of the recovery process. Daily choices and continued support from friends, family and others like themselves are a critical part of the road to recovery.</p></div>
            </div>
            <div className="add2">
                <div style={{ paddingLeft: "20px" }}><h5>ABOUT ADDICTION.</h5>
                    <p>Addiction is often misunderstood. Many people believe that addicts can stop if they are simply willing to change their behavior. The fact is, addiction is a disease that impacts the brain. Stopping drug or alcohol abuse is not simply a matter of willpower. Drugs and alcohol can change the brain to foster compulsive use and abuse.

                        Addiction treatment usually requires a combination of medication and addiction counseling or substance abuse therapy. In addition, many drug or alcohol dependent individuals suffer from an underlying mental disorders. Addiction counseling and treatment methods must go beyond the addictive behavior and address any co-occurring medical, psychiatric and social problems.

                        Today much more is understood about how drugs and alcohol work in the brain, and we know that drug and alcohol addiction can be successfully treated.</p></div>
                <div><img style={{ width: "300px", height: "200px", paddingRight: "20px" }} src="https://support.therapytribe.com/wp-content/uploads/2015/07/Addiction-Substance-Abuse.jpg" />
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

export default Addiction;
