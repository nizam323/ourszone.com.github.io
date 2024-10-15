import React, { useEffect, useState } from "react";
import Form_inp from "./Form-input";
import { getDatabase,set, ref, update, onValue } from "firebase/database";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

const dataBase = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);


export default function CreatePost() {
    const [postTitle, setPostTitle] = useState("");
    const [postPic, setPostPic] = useState("");

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
        if (userData) {
            let downloadPostURL;
            if (postPic) {
                const postImgRef = storageRef(storage, `upload/images/user/posts${Date.now()}-${postPic.name}`)
                await uploadBytes(postImgRef, postPic)
                downloadPostURL = await getDownloadURL(postImgRef);
            };
            if (postTitle) {
                await set(ref(dataBase, 'users_info/' + userData.id + '/posts'),
                    [
                        {
                            postTitle: postTitle,
                            postPicUrl: downloadPostURL
                        }
                    ])
            };
            navigate("/home/user")
        }
    }

    return (
        <>
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