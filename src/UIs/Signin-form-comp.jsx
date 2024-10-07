import React, { useState, useContext } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { UserContext } from "../App";
import { regUsers } from "../components/Data";
import { NavLink, useNavigate } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import Loader from "../components/Loader";
import ShowLoader from "../components/ShowLoader";

const auth = getAuth(app)

function Signin_form() {

    const { setIsSignedIn, setSignedInUser,loader, setLoader } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);
    const navigate = useNavigate();

    // regUsers.find(items => userEmail === items.useremail && userPassword === items.userpassword);

    async function dataPush() {
        if (!userEmail || !userPassword) {
            if (!userEmail) setFillInpsEmail(true);
            else { setFillInpsEmail(false) }
            if (!userPassword) setFillInpPassword(true);
            else { setFillInpPassword(false) }
            return;
        }

        setLoader(true);
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
            setLoader(false);
            const userInfo = userCredential.user;

            setIsSignedIn(true);
            setSignedInUser(userInfo);

            setUserPassword("");
            setUserEmail("");
            setFillInpsEmail(false);
            setFillInpPassword(false);

            window.alert("Signin Successful");
            navigate("/home/user");

        } catch (error) {
            setLoader(false);
            if (error.code === 'auth/wrong-password') {
                alert("Invalid Password");
            }
            else if (error.code === 'auth/invalid-credential') {
                alert("Invalid Email Or Password");
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
    //    if (userEmail && userPassword) {

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
            <Loader>
                {loader && <ShowLoader />}
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
            </Loader>
        </>
    )
};

export { Signin_form }