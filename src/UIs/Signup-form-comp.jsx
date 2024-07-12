import React from "react";
import Form_inp from "../components/Form-input";

function Signup_form() {
    return (
        <div className="form-con">
            <h2 className="sign-h2">SignUp</h2>
            <br />
            <br />
            <div className="inp-con">
                <Form_inp type="text" placeholder="Username" />
                <br />
                <Form_inp type="password" placeholder="Password" />
                <br />
                <Form_inp type="password" placeholder="Repeat Password" />
                <br />
                <button className="signin-btn">SignUp</button>
            </div>
        </div>

    )
};

export { Signup_form }