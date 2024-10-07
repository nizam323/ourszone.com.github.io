import React, { useContext, useState } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { regUsers } from "../components/Data";
import { NavLink } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";

import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import Loader from "../components/Loader";
import ShowLoader from "../components/ShowLoader";
import { UserContext } from "../App";

const db = getDatabase(app);
const auth = getAuth(app);

function Signup_form() {

    const { loader, setLoader } = useContext(UserContext);

    const [hidePassword, setHidePassword] = useState(true);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpName, setFillInpName] = useState(false);
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);

    // const check = regUsers.find(items => userEmail === items.useremail);

    async function dataPush() {
        if (!userName || !userEmail || !userPassword) {
            if (!userName) { setFillInpName(true) }
            else { setFillInpName(false) };

            if (!userEmail) { setFillInpsEmail(true) }
            else { setFillInpsEmail(false) };

            if (!userPassword) { setFillInpPassword(true) }
            else { setFillInpPassword(false) };
        }
        if (userName && userEmail && userPassword) {
            setLoader(true)

            // const newUser = {
            //     username: userName,
            //     useremail: userEmail,
            //     userpassword: userPassword,
            // };
            // setUsers((prevUsers) => {
            //     const updatedUsers = [...prevUsers, newUser];
            //     return updatedUsers;
            // });

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
                setLoader(false)
                const userInfo = userCredential.user;
                console.log(userInfo);

                window.alert("signup sucessfull");
                setUserPassword("");
                setUserEmail("");
                setUserName("");
                setFillInpName(false);
                setFillInpsEmail(false);
                setFillInpPassword(false);
            }
            catch (error) {
                setLoader(false)
                if (error.code === 'auth/email-already-in-use') {
                    setLoader(false)
                    window.alert("User Already Exists Try Other Email.");
                } else if (error.code === 'auth/invalid-email') {
                    setLoader(false)
                    window.alert("Please Enter Valid Email.");
                } else if (error.code === 'auth/weak-password') {
                    setLoader(false)
                    window.alert("The password Must Contain 6 Letters.");
                } else {
                    setLoader(false)
                    console.error(error.message);
                }
            };
        }
    }

    return (
        <>

            <Loader>

                {loader && <ShowLoader />}

                <div className="parent">
                    <div className="login-page-con">
                        <div className="btn-sm-con">
                            <NavLink to={"/"} >
                                <Btn_sm
                                    btn_txt="SignIn"
                                    id="signin-btn"
                                /></NavLink>

                            <NavLink to={"/signup"} className={({ isActive }) => isActive ? "activeBtn btn-sm" : ''} >
                                SignUp
                            </NavLink>
                        </div>

                        <div className="form-con">
                            <h2 className="sign-h2">SignUp</h2>
                            <br />
                            <br />
                            <div className="inp-con">
                                <Form_inp value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" placeholder="Username" />
                                {fillInpName &&
                                    <ErrorFillInput />
                                }
                                <br />
                                <Form_inp onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" placeholder="Email" />
                                {fillInpEmail &&
                                    <ErrorFillInput />
                                }
                                <br />
                                <span style={{
                                    width: "80%",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <Form_inp onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type={hidePassword ? "password" : "text"} placeholder="Password"
                                    >
                                        <div style={{ position: "absolute" }} onClick={() => { setHidePassword(!hidePassword) }}>KKK</div>
                                    </Form_inp>
                                </span>
                                {fillInpPassword &&
                                    <ErrorFillInput />
                                }
                                <br />
                                <button className="signin-btn" onClick={dataPush}>SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Loader>


        </>)
};

export { Signup_form };