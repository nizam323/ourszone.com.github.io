import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

const auth = getAuth(app);
const dataBase = getDatabase(app);

function Posts() {

    const [data, setData] = useState([]);
    const [dataUsersPosts, setDataUsersPosts] = useState([]);

    useEffect(() => {
        let fn = onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(dataBase, "users_info/"),
                    async (snapshot) => {
                        let userData = await snapshot.val();
                        setData(userData ? Object.values(userData) : []);
                    }
                );
            }
        });
        return () => fn();
    }, []);

    useEffect(() => {
        const allPosts = data
            ? data.flatMap((items) =>
                items.posts ? Object.values(items.posts) : []
            )
            : [];
        setDataUsersPosts(allPosts);
    }, [data]);

    // console.log("dataUsersPosts", dataUsersPosts);

    let date = new Date();
    const initialPosts = [
        {
            id: 1,
            text: "i am post",
            profileName: "user name",
            url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
            hr: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
            likesCount: 0,
            likes: true,
            showComments: false,
        }
    ];

    const [posts, setPosts] = useState(initialPosts);

    function handleLike(postId) {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        likesCount: post.likes ? post.likesCount + 1 : post.likesCount - 1,
                        likes: !post.likes,
                    }
                    : post
            )
        );
    }

    function toggleComments(postId) {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        showComments: !post.showComments,
                    }
                    : post
            )
        );
    }

    return (
        <>
            <div className="posts py-0 px-3" style={{ backgroundColor: "#000000" }}>
                {posts.length <= 0 ? (
                    <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">
                        Your Posts Appear Here
                    </p>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="card"
                            style={{
                                width: "96%",
                                margin: "15px auto 0",
                                border: "1px solid white",
                                borderRadius: ".25rem",
                            }}
                        >
                            <span className="d-flex">
                                <img
                                    alt="..."
                                    src={post.url}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid",
                                        margin: "10px 15px 0 10px",
                                    }}
                                />
                                <div className="d-flex flex-column" style={{ marginTop: "10px" }}>
                                    <h4>{post.profileName}</h4>
                                    <pre>
                                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${post.hr <= 9 ? "0" + post.hr : post.hr
                                            }:${post.min <= 9 ? "0" + post.min : post.min}:${post.sec <= 9 ? "0" + post.sec : post.sec
                                            }`}
                                    </pre>
                                </div>
                            </span>
                            <div className="card-body">
                                <p className="card-text">{post.text}</p>
                            </div>
                            {post.url && <img src={post.url} className="card-img-top" alt={`Post ${post.id}`} />}
                            <div className="d-flex justify-content-around m-3">
                                <div className={post.likes == false ? "like-btn like" : "like"} onClick={() => handleLike(post.id)}>
                                    Like {post.likesCount > 0 && post.likesCount}
                                </div>
                                <div className={post.showComments ? "com-btn like" : "like"} onClick={() => toggleComments(post.id)}>
                                    Comments
                                </div>
                            </div>
                            {
                                post.showComments && (
                                    <div className="comments-box-con">
                                        <div className="comments-box">
                                            <div className="close-comments" onClick={() => toggleComments(post.id)}>X</div>
                                            <div className="comments-con">
                                                <div className="com-img"><img src={post.url} width="35" height="35" /></div>
                                                <div style={{ marginTop: "10px" }}>
                                                    <h4>{post.profileName}</h4>
                                                    <pre>
                                                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${post.hr <= 9 ? "0" + post.hr : post.hr
                                                            }:${post.min <= 9 ? "0" + post.min : post.min}:${post.sec <= 9 ? "0" + post.sec : post.sec
                                                            }`}
                                                    </pre>
                                                    <div style={{ backgroundColor: "white", padding: "2px" }}>Comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis animi culpa error veritatis delectus aliquam dolores. Laborum minus itaque magni iusto beatae accusamus corporis accusantium dolore ratione, veniam, alias voluptates. Section for Post {post.id}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                )
                }
            


            <div>
                {dataUsersPosts.map((post, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            width: "96%",
                            margin: "15px auto 0",
                            border: "1px solid white",
                            borderRadius: ".25rem",
                        }}
                    >
                        <span className="d-flex">
                            <img
                                alt="Profile"
                                src={post.url || ""}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    border: "1px solid",
                                    margin: "10px 15px 0 10px",
                                }}
                            />
                            <div className="d-flex flex-column" style={{ marginTop: "10px" }}>
                                <h4>{post.profileName || "Unknown User"}</h4>
                                <pre>{`${post.date}/${post.month}/${post.hr} | ${post.hr}hr ${post.min}min ${post.sec}sec`}</pre>
                            </div>
                        </span>
                        <div className="card-body">
                            <p className="card-text">{post.postTitle || "No content available"}</p>
                        </div>
                        {<img src={post.postPicUrl} className="card-img-top" alt={`Post`} />}
                        <div className="d-flex justify-content-around m-3">
                            <div
                                className={post.likes ? "like-btn like" : "like"}
                            >
                                Like
                            </div>
                            <div
                                className={post.showComments ? "com-btn like" : "like"}
                            >
                                Comments
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            </div>
        </>
    );
}

export default Posts;