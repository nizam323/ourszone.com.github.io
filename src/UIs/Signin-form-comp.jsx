import React, { useState, useContext } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";
import { UserContext } from "../App";
import { regUsers } from "../components/Data";
import { NavLink, useNavigate } from "react-router-dom";
import Btn_sm from "../components/Btn-sm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import ShowLoader from "../components/ShowLoader";
import { getDatabase, set, ref, onValue, update } from "firebase/database";
import Alert from "../components/Alert";

const auth = getAuth(app)
const dataBase = getDatabase(app)

function Signin_form() {

    const { setIsSignedIn, setSignedInUser } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();
    const [myAlert, setAlert] = useState(false)
    const [loader, setLoader] = useState(false)

    // regUsers.find(items => userEmail === items.useremail && userPassword === items.userpassword);

    async function dataPush() {
        if (!userEmail || !userPassword) {
            if (!userEmail) setFillInpsEmail(true);
            else { setFillInpsEmail(false) }
            if (!userPassword) setFillInpPassword(true);
            else { setFillInpPassword(false) }
            return;
        }


        if (userEmail && userPassword) {
            setLoader(true);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
                setAlert(true)
                const userInfo = userCredential.user;

                await update(ref(dataBase, 'users_info/' + userInfo.uid),
                    {
                        id: userInfo.uid,
                        email: userInfo.email,
                    })
                console.log(userInfo);

                setIsSignedIn(true);
                setSignedInUser(userInfo);

                setUserPassword("");
                setUserEmail("");
                setFillInpsEmail(false);
                setFillInpPassword(false);

                // setLoader(false)
                navigate("/home/user");
            } catch (error) {
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
            } finally {
                setLoader(false)
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
            {loader && <ShowLoader />}
            {myAlert && <Alert text="Signin Successful"
                icon={<i className="fa-regular fa-circle-check" style={{ color: "wheat" }}></i>} />}

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
                            <Form_inp onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type={hidePassword ? "password" : "text"} placeholder="Password" />
                            {fillInpPassword &&
                                <ErrorFillInput />
                            }
                            <br />
                            <div>{hidePassword ? "Show Password" : "Hide Password"} <span><input type="checkbox" onClick={() => { setHidePassword(!hidePassword) }} /></span></div>
                            <br />
                            <a className="forgot-pass-a" href="">Forgot Password?</a>
                            <br />
                            <button className="signin-btn" onClick={dataPush}>SignIn</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export { Signin_form }