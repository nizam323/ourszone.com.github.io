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

    function dataPush() {

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

export { Signup_form }