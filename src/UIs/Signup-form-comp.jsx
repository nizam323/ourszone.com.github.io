import React, { useState } from "react";
import Form_inp from "../components/Form-input";

function Signup_form() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function dataPush() {
        console.log(userName);
        console.log(userEmail);
        console.log(userPassword);
        setUserPassword("");
        setUserEmail("");
        setUserName("");
    }


    return (
        <div className="form-con">
            <h2 className="sign-h2">SignUp</h2>
            <br />
            <br />
            <div className="inp-con">
                <Form_inp value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" placeholder="Username" />
                <br />
                <Form_inp onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" placeholder="Email" />
                <br />
                <Form_inp onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" placeholder="Password" />
                <br />
                <button className="signin-btn" onClick={dataPush}>SignUp</button>
            </div>
        </div>

    )
};

export { Signup_form }