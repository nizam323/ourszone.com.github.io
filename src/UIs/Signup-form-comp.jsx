import React, { useState } from "react";
import Form_inp from "../components/Form-input";
import ErrorFillInput from "../components/Error-fill-input";

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
                setUsers([...users, {
                    username: userName,
                    useremail: userEmail,
                    userpassword: userPassword,
                }]);
                window.alert("signup sucessfull");
                console.log(...users);
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
        } else { window.alert("User Already Exesist") };
    }

    return (
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
    )
};

export { Signup_form };

function Signin_form() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [fillInpEmail, setFillInpsEmail] = useState(false);
    const [fillInpPassword, setFillInpPassword] = useState(false);

    // const check = users;
    function dataPush() {
        if (userEmail && userPassword) {
            window.alert("signin sucessfull");
            setUserPassword("");
            setUserEmail("");
            setFillInpsEmail(false);
            setFillInpPassword(false);
            console.log(userEmail);
            console.log(userPassword);
        } else if (!userEmail || !userPassword) {

            if (!userEmail) { setFillInpsEmail(true) }
            else { setFillInpsEmail(false) };

            if (!userPassword) { setFillInpPassword(true) }
            else { setFillInpPassword(false) };
        }
    }

    return (
        <>
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
            </div>
        </>
    )
};

export { Signin_form }