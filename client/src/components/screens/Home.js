import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";
import M from "materialize-css"

const Home = () => {
    const [data, setData] = useState([])
    const [commentValue, setcommentValue] = useState("")
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/allstory', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.stories)
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
                // console.log(result)

                const newData = data.map(item => {
                    if (item._id === result._id) {
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
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
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
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
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

    const deleteComment = (postId, commentId) => {
        fetch(`/deletecomment/${postId}/${commentId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        result.postedBy = item.postedBy;
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData);
                M.toast({ html: "Comment Deleted Successfully", classes: "#388e3c green darken-1" });
            })
    }
    return (
        <div>
            <div className="container">
                <div className="box">

                    <Link to="/addiction"><img src="https://img.freepik.com/free-photo/addiction-pills-cigarettes_23-2148585918.jpg" /></Link>
                    <h6 className="txt">Addiction</h6>
                </div>
                <div className="box">
                    <Link to="/anxiety"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo3IIdfQf8ibIeRWtjDdZPj9WHFSG65VQvyfUUYov1pQ&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">Anxiety</h6>
                </div>
                <div className="box">
                    <Link to="/depression"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdCulqKw0otOlYoPd0W53vM_pwapWPRRNRk1yjfllzCA&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">Depression</h6>
                </div>
                <div className="box">
                    <Link to="/hiv"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGxSdFPNHyl1ArXF6hkhbyww3gt6sIYo8kEv1nSjcng&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">HIV/AIDS</h6>
                </div>

            </div>
            <div className="container">
                <div className="box">
                    <Link to="/family"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTu2bDRMD51VFTnNQU6MXdfZ4kpfkcbcx4Z4i4eDqg&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">Marriage/Family</h6>
                </div>
                <div className="box">
                    <Link to="/ocd"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23hyiTlPLyZsgvBOTfB-nKEoMmbV3nLLs_m3wcgZWpA&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">OCD</h6>
                </div>
                <div className="box">
                    <Link to="/teen"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hf6YzlD2klnCxIE60DUOZBhgymD3qW9q3f_nQscABw&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">Teen</h6>
                </div>
                <div className="box">
                    <Link to="/lgbtq"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHDQbTHMEbCxLlsBoeaNIRQTVa56HM12MCLfi8Ha0Uw&usqp=CAU&ec=48665698" /></Link>
                    <h6 className="txt">LGBTQ</h6>
                </div>

            </div>
            <hr />
            <hr />
            <div className="container">
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/3562dbf3dce145ed6739c9672424b5e3.jpg" />
                    <h6 align="center">Sweat</h6>
                    <p align="center">Walk, run, cycle, or burpee your way to success.</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/09410ded176a738263876a58e9242791.jpg" />
                    <h6 align="center">Host</h6>
                    <p align="center">Grab your friends and family and host an event</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/3b842135cd52a8b80150bc2f02b2c858.jpg" />
                    <h6 align="center">Remember</h6>
                    <p align="center">Honour your loved ones</p>
                </div>
            </div>
            <div className="container">
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/a415e34dca3f900bc5925603c09b3f31.jpg" />
                    <h6 align="center">Change</h6>
                    <p align="center">Cut your hair, shave your head and grow a mullet</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/e531cfc4f550faed78e4280938cb18c2.jpg" />
                    <h6 align="center">Stream</h6>
                    <p align="center">Play your favorite game</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/8fc56859606070fd9bb7868ea9b5d5cf.jpg" />
                    <h6 align="center">Celebrate</h6>
                    <p align="center">Celebrate every special day</p>
                </div>
            </div>
            <div className="container">
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/6f134c484a03b05907b36ee3703c85d1.jpg" />
                    <h6 align="center">Work</h6>
                    <p align="center">Enjoy your work</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/c1540948213bdaf98f33488376245027.jpg" />
                    <h6 align="center">Resist</h6>
                    <p align="center">Give up a bad habit for good cause</p>
                </div>
                <div className="box1">
                    <img src="https://d3t7uih9heml08.cloudfront.net/92e6281e4fc9c7306a310cc5597cb16c.jpg" />
                    <h6 align="center">Donate</h6>
                    <p align="center">Donate a portion of your day to others</p>
                </div>
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
export default Home;