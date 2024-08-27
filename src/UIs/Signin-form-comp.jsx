import React, { useState, useContext } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { UserContext } from "../App";
import UserProfile from "../components/User_profile";
import { regUsers } from "../components/Data";
import { NavLink } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";

function Signin_form() {

    const {
        loginpageDisplay, setLoginpageDisplay,
        isSignedIn, setIsSignedIn, signedInUser, setSignedInUser
    } = useContext(UserContext);
     
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);

    // const [isSignedIn, setIsSignedIn] = useState(false);
    // const [signedInUser, setSignedInUser] = useState("");

    const check = regUsers.find(items => userEmail === items.useremail && userPassword === items.userpassword);
    function dataPush() {
        if (check) {
            if (userEmail && userPassword) {
                window.alert("signin sucessfull");

                // setLoginpageDisplay(false)
                setIsSignedIn(true);
                setSignedInUser(check);

                setUserPassword("");
                setUserEmail("");
                setFillInpsEmail(false);
                setFillInpPassword(false);
            }
        }
        else {
            if (!userEmail || !userPassword) {

                if (!userEmail) { setFillInpsEmail(true) }
                else { setFillInpsEmail(false) };

                if (!userPassword) { setFillInpPassword(true) }
                else { setFillInpPassword(false) };
            }
            else { alert("Invalid Email Or Password") }
        }
    }

    // if (!loginpageDisplay) {
    // return (
    // <>
    //     {isSignedIn && signedInUser && (
    //         < UserProfile
    //             userName={signedInUser.username}
    //             userEmail={signedInUser.useremail}
    //         />)
    //     }
    // // </>
    // )
    // }

    return (
        <>
            {/* {isSignedIn && signedInUser ?
                < UserProfile
                    userName={signedInUser.username}
                    userEmail={signedInUser.useremail}
                /> : */}
            <div className="parent">
                <div className="login-page-con">
                    <div className="btn-sm-con">

                        <NavLink to={"/"} className={({ isActive }) => isActive ? 'activeBtn btn-sm' : ''}>
                            SignIn
                            {/* // bg_color={isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"} */}
                            {/* // color={isSignInVisible ? "white" : "black"} */}
                            {/* // btn_txt="SignIn" */}
                            {/* // id="signin-btn" */}
                            {/* // onClick={handleSigninClick} */}
                            {/* // /> */}
                        </NavLink>

                        <NavLink to={"/signup"}>
                            <Btn_sm
                                // bg_color={!isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"}
                                // color={!isSignInVisible ? "white" : "black"}
                                btn_txt="SignUp"
                                id="signup-btn"
                            // onClick={handleSignupClick}
                            /></NavLink>



                    </div>

                    <div className="form-con">
                        <h2 className="sign-h2">SignIn</h2>
                        <br />
                        <br />
                        <div className="inp-con">
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
                            <a className="forgot-pass-a" href="">Forgot Password?</a>
                            <br />
                            <button className="signin-btn" onClick={dataPush}>SignIn</button>
                        </div>
                    </div>        </div>
            </div>


            {/* } */}
        </>
    )
};

export { Signin_form }