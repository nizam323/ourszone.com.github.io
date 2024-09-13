import React, { useRef, useState, useContext } from "react";
import { UserContext } from '../App'

function Posts() {

    let likeBtn = useRef()
    let [likesCount, setLikesCount] = useState(0)
    let [likes, setLikes] = useState(true);

    let date = new Date();
    let posts = [
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
        {
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
        },
    ];

    function like() {
        if (likes === true) {
            likeBtn.current.className = "like like-btn"
            setLikesCount(likesCount + 1)
            setLikes(false)
        } else {
            likeBtn.current.className = "like"
            setLikesCount(likesCount - 1)
            setLikes(!likes)
        }
    }

    let { commentsBtn } = useContext(UserContext)

    function showComments() {
        commentsBtn.current.classList.toggle("d-block")
    }

    return (
        <>
            <div className="posts py-0 px-3" style={{ backgroundColor: '#000000' }}>
                {posts.length <= 0 ? (
                    <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">
                        Your Posts Appear Here
                    </p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="card" style={{
                            width: "96%", margin: '15px auto 0',
                            border: '1px solid white'
                            , borderRadius: ".25rem",
                        }}>
                            <span className="d-flex">
                                <img
                                    alt="..."
                                    src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid",
                                        margin: "10px 15px 0 10px"
                                    }}
                                />
                                <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                                    <h4>{post.profileName}</h4>
                                    <pre>
                                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${post.hr <= 9 ? "0" + post.hr : post.hr}:${post.min <= 9 ? "0" + post.min : post.min}:${post.sec <= 9 ? "0" + post.sec : post.sec}`}
                                    </pre>
                                </div>
                            </span>
                            <div className="card-body">
                                <p className="card-text">{post.text}</p>
                            </div>
                            {post.url && <img src={post.url} className="card-img-top" alt={`Post ${index}`} />}
                            <div className="d-flex justify-content-around m-3">
                                <div className="like" ref={likeBtn} onClick={like}>Like {likesCount > 0 && likesCount}</div>
                                <div className="like" onClick={showComments}>Comments</div>


                            </div>
                                <div className="comments-box-con">
                                    <div ref={commentsBtn} className="comments-box">X</div>
                                </div>


                        </div>
                    ))
                )}
            </div >
        </>
    )
}

export default Posts;