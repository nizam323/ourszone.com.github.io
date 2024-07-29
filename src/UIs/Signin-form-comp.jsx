import React, { useState } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";

function Signin_form() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function dataPush() {
        console.log(userEmail);
        console.log(userPassword);
        setUserPassword("");
        setUserEmail("");
    }

    return (
        <div className="form-con">
            <h2 className="sign-h2">SignIn</h2>
            <br />
            <br />
            <div className="inp-con">
                <Form_inp onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" placeholder="Email" />
                <br />
                <Form_inp onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" placeholder="Password" />
                <br />
                <a className="forgot-pass-a" href="">Forgot Password?</a>
                <br />
                <button className="signin-btn" onClick={dataPush}>SignIn</button>
            </div>
        </div>
    )
};

export { Signin_form }