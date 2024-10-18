import React, { useState, useEffect, useContext } from "react";
import Btn_sm from "../components/Btn-sm";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { onValue, ref, getDatabase } from "firebase/database";
import ShowLoader from "./ShowLoader";

const auth = getAuth(app);
const dataBase = getDatabase(app);

function UserProfile() {

    const [loader, setLoader] = useState(false);
    const [posts1, setPosts1] = useState([]);
    const [p, setP] = useState({});

    useEffect(() => {
        setLoader(true)
        let check = onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(dataBase, 'users_info/' + user.uid),
                    async (snapshot) => {
                        let userData = await snapshot.val();
                        setUserData(userData);
                        setPosts1(userData.posts ? Object.values(userData.posts).reverse() : []);
                        // setP(userData);
                        setLoader(false);
                        console.log(posts1);
                        console.log(userData.posts);

                    });
            } else {
                setUserData(null)
            }
        })
        return () => check()
    }, [])

    // let date = new Date();
    const { setIsSignedIn } = useContext(UserContext);

    // const [city, setCity] = useState("")
    // const [status, setStatus] = useState("")
    // const [profession, setProfession] = useState("")
    // const [proSrc, setProSrc] = useState("")
    const [userData, setUserData] = useState({})



    // const [posts, setPosts] = useState([]);
    // const [postTxt, setPostTxt] = useState([]);
    // const [postUrl, setPostUrl] = useState([]);
    const navigate = useNavigate();

    // function createPost() {
    //     let postTxt = prompt("Enter Title");
    //     setPostTxt(postTxt);
    //     let postUrl = prompt("Enter Your Image Source");
    //     setPostUrl(postUrl);
    //     if (postTxt && postUrl) {
    //         setPosts([...posts, {
    //             text: postTxt,
    //             url: postUrl,
    //             hr: date.getHours(),
    //             min: date.getMinutes(),
    //             sec: date.getSeconds(),
    //         }]);
    //     }
    // }

    function mySignOut() {
        if (window.confirm("Are you sure you want to Sign Out?")) {
            signOut(auth);
            // navigate("/");
        }
    }

    // function edit_name() {
    //     let name = prompt("Enter Your Name");
    //     setName(name)
    // }

    // function curd() {
    //     let proSrc = prompt("Enter Your profile URL");
    //     setProSrc(proSrc)
    // }

    // function edit_about1() {
    //     let profession = prompt("Enter Your Profession");
    //     setProfession(profession)
    // }
    // function edit_about2() {
    //     let city = prompt("Enter City");
    //     setCity(city)
    // }
    // function edit_about3() {
    //     let status = prompt("Enter Your Status");
    //     setStatus(status)
    // }

    return (
        <>
            <section className="h-100 gradient-custom-2">
                {loader && <ShowLoader />}
                <div className="container py-3 h-100" style={{ backgroundColor: '#000000' }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col col-lg-9 col-xl-8" style={{ width: '100%', }}>
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img
                                            src={userData.profile_picture_URL ? userData.profile_picture_URL : "../../images/istockphoto-1300845620-612x612.jpg"}
                                            alt="Your Profile Photo"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', height: '100%', zIndex: 1 }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            style={{ zIndex: 1 }}
                                            onClick={() => {
                                                navigate('/edit')
                                            }}>
                                            Edit profile
                                        </button>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5 className="about-edit">{
                                            userData.username
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
                                    <Btn_sm onClick={mySignOut} id="signOutBtn" btn_txt="SignOut" />
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-4 text-body">
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-4 bg-body-tertiary">
                                            <p className="font-italic mb-1 about-edit">Profession [ {userData.profession} ]</p>
                                            <p className="font-italic mb-1 about-edit">City [ {userData.city} ]</p>
                                            <p className="font-italic mb-1 about-edit">Status [ {userData.status} ]</p>
                                            <p>Email [ {userData.email} ]</p>
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
                                                src={posts1[0]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col mb-2">
                                            <img
                                                height="150px"
                                                src={posts1[1]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                                />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img
                                                height="150px"
                                                src={posts1[2]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col">
                                            <img
                                                height="150px"
                                                src={posts1[3]?.postPicUrl}
                                                alt=""
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>


                                    <div onClick={() => navigate("/create-post")} className="d-flex justify-content-center align-items-center mb-4 text-body mt-5"><h3 className="btn btn-outline-dark"><span>Create Post</span></h3></div>

                                    <p className="lead fw-normal mb-0">Posts</p>

                                    <div className="posts">
                                        {
                                            userData.posts == undefined ? <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">Your Posts Appear Here </p> : posts1.map((post, index) => (
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
                                                        <div className={post.showComments ? "com-btn like" : "like"}>
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
            </section>
        </>
    );
}

export default UserProfile;
