import React, { useEffect, useState } from "react";
import Form_inp from "./Form-input";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

const dataBase = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

function Edit() {
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("");
    const [profession, setProfession] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [profileURL, setProfileURL] = useState();

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
        let downloadProfileURL;
        if (profilePic) {
            const proImgRef = storageRef(storage, `upload/images/user${Date.now()}-${profilePic.name}`)
            await uploadBytes(proImgRef, profilePic)
            downloadProfileURL = await getDownloadURL(proImgRef);
        };
        if (userData) {
            await update(ref(dataBase, 'users_info/' + userData.id),
                {
                    username: userName != "" ? userName : userData?.username || "",
                    profession: profession != "" ? profession : userData?.profession || "",
                    city: city != "" ? city : userData?.city || "",
                    status: status != "" ? status : userData?.status || "",
                    profile_picture_URL: downloadProfileURL ||
                        userData?.profile_picture_URL || "",
                });
            navigate("/home/user")
        }
    }

    return (
        <>
            <div className="parent" style={{ height: "auto" }}>
                <div className="login-page-con">
                    <div className="btn-sm-con">
                    </div>

                    <div className="form-con">
                        <center>
                            <h2 className="sign-h2" style={{ width: "153px" }}>Edit Profile</h2>
                        </center>
                        <div className="inp-con">
                            <br />
                            <Form_inp
                                onChange={
                                    (e) => setUserName(e.target.value)
                                }
                                value={userName}
                                type="text" placeholder="Enter User Name" />
                            <br />
                            <Form_inp
                                onChange={
                                    (e) => setCity(e.target.value)
                                }
                                value={city}
                                type="text" placeholder="Enter City" />
                            <br />
                            <Form_inp
                                onChange={
                                    (e) => setStatus(e.target.value)
                                }
                                value={status}
                                type="text" placeholder="Enter Status" />
                            <br />
                            <Form_inp
                                onChange={
                                    (e) => setProfession(e.target.value)
                                }
                                value={profession}
                                type="text" placeholder="Enter Profession" />
                            <br />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "2px solid rgb(222, 215, 215)",
                                backgroundColor: "rgb(255 255 255)",
                                padding: "10px"
                            }}>
                                <label htmlFor="">Select Profile Picture</label>
                                <br />
                                <input
                                    style={{ width: "207px" }}
                                    onChange={
                                        (e) => setProfilePic(e.target.files[0])
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

export default Edit;