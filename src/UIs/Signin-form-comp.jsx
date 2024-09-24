import React, { useState, useContext } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { UserContext } from "../App";
import { regUsers } from "../components/Data";
import { NavLink, useNavigate } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app)

function Signin_form() {

    const { setIsSignedIn, setSignedInUser } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);
    const navigate = useNavigate();

    // regUsers.find(items => userEmail === items.useremail && userPassword === items.userpassword);

    async function dataPush() {
        if (!userEmail || !userPassword) {
            if (!userEmail) setFillInpsEmail(true);
            if (!userPassword) setFillInpPassword(true);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
            const user = userCredential.user;

            setIsSignedIn(true);
            setSignedInUser(user);

            setUserPassword("");
            setUserEmail("");
            setFillInpsEmail(false);
            setFillInpPassword(false);

            window.alert("Sign-in successful");
            navigate("/home/user");

        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                alert("Invalid Password");
            }
            else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
                alert("Invalid Email");
            }
            else {
                console.error("Sign-in error: ", error.message);
            }
        }
    }
    // function dataPush() {
    //     let check = false;

    //     signInWithEmailAndPassword(auth, userEmail, userPassword).then((value) => {
    //         check==true
    //         alert("hi")
    //     });

    //     if (check) {
    //         if (userEmail && userPassword) {

    //             window.alert("signin sucessfull");

    //             setIsSignedIn(true);
    //             setSignedInUser(check);

    //             setUserPassword("");
    //             setUserEmail("");
    //             setFillInpsEmail(false);
    //             setFillInpPassword(false);

    //             // navigate("home/user");

    //         }
    //     }
    //     else {
    //         if (!userEmail || !userPassword) {

    //             if (!userEmail) { setFillInpsEmail(true) }
    //             else { setFillInpsEmail(false) };

    //             if (!userPassword) { setFillInpPassword(true) }
    //             else { setFillInpPassword(false) };
    //         }
    //         else { alert("Invalid Email Or Password") }
    //     }
    // }

    return (
        <>
            <div className="parent">
                <div className="login-page-con">
                    <div className="btn-sm-con">

                        <NavLink to={"/"} className={({ isActive }) => isActive ? 'activeBtn btn-sm' : ''}>
                            SignIn
                        </NavLink>

                        <NavLink to={"/signup"}>
                            <Btn_sm
                                btn_txt="SignUp"
                                id="signup-btn"
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
        </>
    )
};

export { Signin_form }