import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { update, ref as updateRef } from "firebase/database";

const auth = getAuth(app);
const dataBase = getDatabase(app);

function Posts() {

    const [data, setData] = useState([]);
    const [dataUsersPosts, setDataUsersPosts] = useState([]);
    const [currentUserUid, setCurrentUserUid] = useState("");
    const [shuffledPosts, setShuffledPosts] = useState([]);

    // useEffect(() => {
    //     //random post logic
    //     const results = [];

    //     function random() {
    //         return Math.floor(Math.random() * dataUsersPosts.length);
    //     }

    //     for (let i = 0; i < dataUsersPosts.length; i++) {
    //         let rand = random();
    //         results.push(rand);
    //     }

    //     let seen = new Set();

    //     for (let i = 0; i < results.length; i++) {
    //         while (seen.has(results[i])) {
    //             results[i] = random();
    //         }
    //         seen.add(results[i]);
    //     }

    //     const reordered = results.map(index => dataUsersPosts[index]);

    //     setShuffledPosts(reordered);

    // }, [dataUsersPosts]);

    useEffect(() => {
        let fn = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserUid(user.uid);
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
            ? data.flatMap((user) =>
                user.posts
                    ? Object.entries(user.posts).map(([postId, post]) => ({
                        ...post,
                        postId
                    }))
                    : []
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

    // like functionality
    function handle_likes(postOwnerUserId, currentUserUid, postsId, postsLikes, likesByUsersIds) {
        const postRef = updateRef(dataBase, `users_info/${postOwnerUserId}/posts/${postsId}`);
        const likedBy = likesByUsersIds || [];
        let updatedLikes = postsLikes;
        let updatedLikedBy = [...likedBy];

        if (!likedBy.includes(currentUserUid)) {
            updatedLikes += 1;
            updatedLikedBy.push(currentUserUid);
        } else {
            updatedLikes -= 1;
            updatedLikedBy = likedBy.filter((uid) => uid != currentUserUid)
        }

        update(postRef, {
            likes: updatedLikes,
            likesByUsersIds: updatedLikedBy
        });

    }

    return (
        <>
            <div className="posts py-0 px-3" style={{ backgroundColor: "#000000" }}>
                {posts.length <= 0 ? (
                    <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">
                        Your Posts Appear Here
                    </p>
                ) : ("")}

                <div>
                    {
                        //shuffledPosts
                        dataUsersPosts.map((post, index) => (
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
                                        className={post.likes > 0 ? "like-btn like" : "like"}
                                        onClick={() => handle_likes(post.userId, currentUserUid, post.postId, post.likes, post.likesByUsersIds)}
                                    >
                                        Like {post.likes > 0 && post.likes}
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