import React, { useEffect, useState } from "react";
import Form_inp from "./Form-input";
import { getDatabase, set, ref, update, onValue, push } from "firebase/database";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import ShowLoader from "./ShowLoader";
import Alert from "./Alert";


const dataBase = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
let date = new Date();

export default function CreatePost() {
    const [postTitle, setPostTitle] = useState("");
    const [postPic, setPostPic] = useState("");
    const [loader, setLoader] = useState(false);
    const [myAlert, setMyAlert] = useState(false);

    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let check = onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(dataBase, 'users_info/' + user.uid),
                    async (snapshot) => {
                        let userData = await snapshot.val();
                        setUserData(userData);
                    });
            } else {
                setUserData(null)
            }
        })

        return () => check();
    }, [])

    async function putData() {
        setLoader(true);
        if (postPic && postTitle) {
            if (userData) {
                let downloadPostURL;
                if (postPic) {
                    const postImgRef = storageRef(storage, `upload/images/user/posts${Date.now()}-${postPic.name}`)
                    await uploadBytes(postImgRef, postPic)
                    downloadPostURL = await getDownloadURL(postImgRef);
                };
                if (postTitle) {
                    const postRef = ref(dataBase, 'users_info/' + userData.id + '/posts');
                    const post = {
                        postTitle: postTitle,
                        postPicUrl: downloadPostURL,
                        date: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        hr: date.getHours(),
                        min: date.getMinutes(),
                        sec: date.getSeconds(),
                    };
                    await push(postRef, post)
                        .then(() => {
                            console.log('Post added successfully!');

                            setTimeout(() => {
                                setMyAlert(true)
                                setTimeout(() => {
                                    navigate("/home/user")
                                }, 1500)
                            }, 0)
                        })
                        .catch((error) => {
                            console.error('Error adding post: ', error);
                        }).finally(setLoader(false));
                };
            }
        } else {
            setLoader(false);
            alert("please fill inputs")
        }
    }

    return (
        <>
            {loader && <ShowLoader />}
            {myAlert && <Alert text="Post Created" />}
            <div className="parent">
                <div className="login-page-con">
                    <div className="btn-sm-con">
                    </div>

                    <div className="form-con">
                        <center>
                            <h2 className="sign-h2" style={{ width: "160px" }}>Create Post</h2>
                        </center>
                        <div className="inp-con">
                            <br />
                            <Form_inp
                                onChange={
                                    (e) => setPostTitle(e.target.value)
                                }
                                value={postTitle}
                                type="text" placeholder="Enter Post Title" />
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "2px solid rgb(222, 215, 215)",
                                    backgroundColor: "rgb(255 255 255)",
                                    padding: "10px"
                                }}>
                                <label htmlFor="">Select Post Picture</label>
                                <br />
                                <input
                                    style={{ width: "207px" }}
                                    onChange={
                                        (e) => setPostPic(e.target.files[0])
                                    }
                                    type="file" />
                            </div>
                            <br />
                            <button style={{ backgroundColor: "rgb(231 83 72)", border: "1px solid", color: "" }} className="btn btn-outline-dark" onClick={putData}><span className="text-white">Save</span></button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}