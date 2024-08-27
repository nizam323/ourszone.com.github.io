import React, { useState } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { regUsers } from "../components/Data";
import { NavLink } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";

function Signup_form() {

    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpName, setFillInpName] = useState(false);
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);

    const check = users.find(items => userEmail === items.useremail);
    function dataPush() {
        if (!check) {
            if (userName && userEmail && userPassword) {
                const newUser = {
                    username: userName,
                    useremail: userEmail,
                    userpassword: userPassword,
                };
                setUsers((prevUsers) => {
                    const updatedUsers = [...prevUsers, newUser];
                    return updatedUsers;
                });
                window.alert("signup sucessfull");
                regUsers.push(newUser)
                setUserPassword("");
                setUserEmail("");
                setUserName("");
                setFillInpName(false);
                setFillInpsEmail(false);
                setFillInpPassword(false);
            } else if (!userName || !userEmail || !userPassword) {
                if (!userName) { setFillInpName(true) }
                else { setFillInpName(false) };

                if (!userEmail) { setFillInpsEmail(true) }
                else { setFillInpsEmail(false) };

                if (!userPassword) { setFillInpPassword(true) }
                else { setFillInpPassword(false) };
            }
        } else { window.alert("User Already Exists Try Other Email") };
    }

    return (

        <>

            <div className="parent">
                <div className="login-page-con">
                    <div className="btn-sm-con">

                        <NavLink to={"/"} >
                            <Btn_sm
                                // bg_color={isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"}
                                // color={isSignInVisible ? "white" : "black"}
                                btn_txt="SignIn"
                                id="signin-btn"
                            // onClick={handleSigninClick}
                            /></NavLink>

                        <NavLink to={"/signup"} className={({ isActive }) => isActive ? "activeBtn btn-sm" : ''} >
                            SignUp
                            {/* <Btn_sm */}
                            {/* // bg_color={!isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"} */}
                            {/* // color={!isSignInVisible ? "white" : "black"} */}
                            {/* btn_txt="SignUp" */}
                            {/* id="signup-btn" */}
                            {/* // onClick={handleSignupClick} */}
                            {/* /> */}
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
                            <Form_inp onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" placeholder="Password" />
                            {fillInpPassword &&
                                <ErrorFillInput />
                            }
                            <br />
                            <button className="signin-btn" onClick={dataPush}>SignUp</button>
                        </div>
                    </div>
                </div>
            </div>


        </>)
};

export { Signup_form };
