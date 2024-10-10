import React, { useEffect, useState } from "react";
import Form_inp from "./Form-input";
import { getDatabase, set, ref } from "firebase/database";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const dataBase = getDatabase(app);
const auth = getAuth(app);

function Edit() {
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("");
    const [profession, setProfession] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user);
                console.log(user);
            }
        })
    }, [userData])

    async function putData() {

        let puttingData = await set(ref(dataBase, 'users_info/' + userData.uid),
            {
                username: userName || userData.username,
                // profile_picture: userInfo.photoURL || '',
                profession: profession || userData.profession,
                city: city || userData.city,
                status: status || userData.status,
            });

        console.log(puttingData, "yes");
        navigate("/home/user")
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
                            <Form_inp
                                onChange={
                                    (e) => setProfilePic(e.target.value)
                                }
                                value={profilePic}
                                type="file" placeholder="Select Profile Picture " />
                            <br />
                            <button onClick={putData}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;
