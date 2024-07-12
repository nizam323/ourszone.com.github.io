import React from "react";
import Form_inp from "../components/Form-input";

function Signin_form() {
    return (
        <div className="form-con">
            <h2 className="sign-h2">SignIn</h2>
            <br />
            <br />
            <div className="inp-con">
                <Form_inp type="text" placeholder="Username" />
                <br />
                <Form_inp type="password" placeholder="Password" />
                <br />
                <a className="forgot-pass-a" href="">Forgot Password?</a>
                <br />
                <button className="signin-btn">SignIn</button>
            </div>
        </div>
    )
};

export {Signin_form}