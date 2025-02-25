import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "../firebase";
import ShowLoader from "./ShowLoader";
import ErrorPage from "../error-page";

const auth = getAuth(app);
const database = getDatabase(app);

export default function PublicProfile({ }) {
    const { id } = useParams();
    const [userData, setUserData] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const [errorPage, setErrorPage] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(database, `users_info/${id}`),
                    async (snapshot) => {
                        setLoader(true)
                        let userData = await snapshot.val();
                        setUserData(userData)
                        setUserPosts(userData && Object.values(userData.posts) || [])
                        setLoader(false)
                        if (!userData) {
                            setUserData(null)
                            setLoader(false)
                            setErrorPage(true)
                        }
                    })
            } else {
                setUserData(null)
                setLoader(false)
            }
        })
    }, [])
    // console.log(userPosts);
    // console.log(errorPage);

    if (loader) return <ShowLoader />;

    if (errorPage == true) return <ErrorPage />;

    return (
        <>
            <section className="h-100 gradient-custom-2">
                <div className="container py-3 h-100 cus-st" style={{ backgroundColor: '#000000' }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col col-lg-9 col-xl-8" style={{ width: '100%', }}>
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <abbr title="Go Backward">
                                        <span className="cus-st-2" onClick={() => window.history.back(1)}><i
                                            style={{ transform: `rotate(180deg)` }} className="fa-solid 
                                            fa-arrow-right"></i></span>
                                    </abbr>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img
                                            src={userData && userData.profile_picture_URL ? userData.profile_picture_URL : "../../images/istockphoto-1300845620-612x612.jpg"}
                                            alt="Your Profile Photo"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', height: '100%', zIndex: 1 }}
                                        />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5 className="about-edit">{
                                            userData?.username
                                        }</h5>
                                    </div>
                                </div>
                                <div className="p-4 text-black bg-body-tertiary">
                                    <div className="d-flex justify-content-end text-center py-1 text-body">
                                        {/* <div>
                                        <p className="mb-1 h5">0</p>
                                        <p className="small text-muted mb-0">Photos</p>
                                    </div>
                                    <div className="px-3">
                                    <p className="mb-1 h5">0</p>
                                        <p className="small text-muted mb-0">Followers</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 h5">0</p>
                                        <p className="small text-muted mb-0">Following</p>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-4 text-body">
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-4 bg-body-tertiary">
                                            <p className="font-italic mb-1 about-edit">Profession [
                                                {userData?.profession}
                                                ]</p>
                                            <p className="font-italic mb-1 about-edit">City [
                                                {userData?.city}
                                                ]</p>
                                            <p className="font-italic mb-1 about-edit">Status [
                                                {userData?.status}
                                                ]</p>
                                            <p>Email [
                                                {userData?.email}
                                                ]</p>
                                        </div>
                                    </div>
                                    {/* 
                                <div className="d-flex justify-content-between align-items-center mb-4 text-body"><h3 className="btn btn-outline-dark"><span>Create Post</span></h3></div> */}

                                    <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                                        <p className="lead fw-normal mb-0">Recent photos</p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img
                                                height="150px"
                                                src={userPosts[0]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col mb-2">
                                            <img
                                                height="150px"
                                                src={userPosts[1]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img
                                                height="150px"
                                                src={userPosts[2]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col">
                                            <img
                                                height="150px"
                                                src={userPosts[3]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>


                                    <div className="mb-4 mt-5"></div>

                                    <center><p className="lead fw-normal mb-0">Posts</p></center>

                                    <div className="posts">
                                        {
                                            userPosts == undefined ? <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">Your Posts Appear Here </p> : userPosts.map((post, index) => (
                                                <div key={index} className="mt-5 card" style={{ width: "100%" }}>
                                                    <span className="d-flex">
                                                        <img key={index} alt="..." src={userData.profile_picture_URL} style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            borderRadius: "50%",
                                                            border: "1px solid",
                                                            margin: "10px 15px 0 10px"
                                                        }} />
                                                        <div className="d-flex flex-column" style={{ marginTop: '10px', width: "100%" }}>
                                                            <h4>{userData.username}</h4>
                                                            <pre style={{ overflow: "hidden" }}>
                                                                {
                                                                    post.date
                                                                    + "/" +
                                                                    post.month
                                                                    + "/" +
                                                                    post.year
                                                                }
                                                                {"  "}
                                                                {
                                                                    (post.hr <= 9 ? "0" + post.hr : post.hr)
                                                                    + ':' +
                                                                    (post.min <= 9 ? "0" + post.min : post.min)
                                                                    + ':' +
                                                                    (post.sec <= 9 ? "0" + post.sec : post.sec + "s")
                                                                }                                                            </pre>
                                                        </div>
                                                    </span>
                                                    <div className="card-body">
                                                        <p className="card-text">{post.postTitle}</p>
                                                    </div>
                                                    <img src={post.postPicUrl} className="card-img-top" alt={`Post ${index}`} />

                                                    <div className="d-flex justify-content-around m-3">
                                                        <div className={post.likes == false ? "like-btn like" : "like"}>
                                                            Like { }
                                                        </div>
                                                        <div className={"like"}>
                                                            Comments
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
