import React, { useEffect, useState } from "react";
import Form_inp from "./Form-input";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
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
        let check = onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(dataBase, 'users_info/' + user.uid),
                    async (snapshot) => {
                        let userData = await snapshot.val();
                        setUserData(userData);
                        console.log(userData);
                    });
            } else {
                setUserData(null)
            }
        })

        return () => check();
    }, [])

    async function putData() {
        if (userData) {
            if (userName || profession || city || status)
                await update(ref(dataBase, 'users_info/' + userData.id),
                    {
                        username: userName || userData.username,
                        profession: profession || userData.profession,
                        city: city || userData.city,
                        status: status || userData.status,
                        // profile_picture: userInfo.photoURL || '',
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
                            <label htmlFor="">Select Profile Picture</label>
                            <input
                                onChange={
                                    (e) => setProfilePic(e.target.value)
                                }
                                value={profilePic}
                                type="file" />
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
