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
    // console.log("data", data);

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

    //random post logic
    const results = [];

    function random() {
        return Math.floor(Math.random() * dataUsersPosts.length);
    }

    for (let i = 0; i < dataUsersPosts.length; i++) {
        let rand = random();
        results.push(rand);
    }

    let seen = new Set();

    for (let i = 0; i < results.length; i++) {
        while (seen.has(results[i])) {
            results[i] = random();
        }
        seen.add(results[i]);
    }

    let reordered = [];

    dataUsersPosts.forEach((item, index) => {
        reordered[results[index]] = item;
    });

    return (
        <>
            <div className="posts py-0 px-3" style={{ backgroundColor: "#000000" }}>
                {posts.length <= 0 ? (
                    <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">
                        Your Posts Appear Here
                    </p>
                ) : ("")}

                <div>
                    {reordered.map((post, index) => (
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
                                {(() => {
                                    const user = data.find(u => u.id === post.userId);
                                    return (
                                        <img
                                            alt="Profile"
                                            src={user?.profile_picture_URL || ""}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                border: "1px solid",
                                                margin: "10px 15px 0 10px",
                                            }}
                                        />
                                    );
                                })()}
                                <div className="d-flex flex-column" style={{ marginTop: "10px" }}>
                                    <h4>
                                        {/* {post.profileName || "Unknown User"} */}
                                        {(() => {
                                            const user = data.find(u => u.id === post.userId);
                                            return user ? user.username : "Unknown User";
                                        })()}
                                    </h4>
                                    <pre>{`${post.date}/${post.month}/${post.year} | ${post.hr}hr ${post.min}min ${post.sec}sec`}</pre>
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