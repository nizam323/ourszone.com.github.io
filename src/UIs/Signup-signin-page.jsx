import React, { useState } from "react";
import Btn_sm from "../components/Btn-sm";
// import { Signin_form } from "./Signin-form-comp.jsx";
import { Signup_form , Signin_form } from "./Signup-form-comp.jsx";

function Loginpage() {
  const [isSignInVisible, setIsSignInVisible] = useState(true);

  function handleSignupClick() {
    setIsSignInVisible(false);
  };

  function handleSigninClick() {
    setIsSignInVisible(true);
  };

  return (
    <div className="parent">
      <div className="login-page-con">
        <div className="btn-sm-con">
          <Btn_sm 
            bg_color={isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"} 
            color={isSignInVisible ? "white" : "black"} 
            btn_txt="SignIn" 
            id="signin-btn" 
            onClick={handleSigninClick} 
          />
          <Btn_sm 
            bg_color={!isSignInVisible ? "#e75348" : "rgb(222, 215, 215)"} 
            color={!isSignInVisible ? "white" : "black"} 
            btn_txt="SignUp" 
            id="signup-btn" 
            onClick={handleSignupClick} 
          />
        </div>
        {isSignInVisible && (
          <Signin_form />
        )}
        {!isSignInVisible && (
          <Signup_form />
        )}
      </div>
    </div>
  );
}

export default Loginpage;
