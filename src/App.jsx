import { createContext, useState } from 'react'
import './App.css'
import './Responsive.css'
// import Loginpage from './UIs/Signup-signin-page'
import UserProfile from "./components/User_profile";
import { customContext } from './context/context.js'
import { Outlet } from 'react-router-dom';
import { Signin_form } from './UIs/Signin-form-comp.jsx';

export const UserContext = createContext()

function App() {
  const [loginpageDisplay, setLoginpageDisplay] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState("");

  return (
    <>
      <UserContext.Provider value={{
        loginpageDisplay, setLoginpageDisplay,
        isSignedIn, setIsSignedIn, signedInUser, setSignedInUser
      }}>

        {/* {loginpageDisplay === false ? */}
        {/* {isSignedIn && signedInUser ? ( */}
        {/* < UserProfile */}
        {/* userName={signedInUser.username} */}
        {/* userEmail={signedInUser.useremail} */}
        {/* />) : <Loginpage /> */}
        {/* } */}
        {/* <Loginpage> */}
        {/* <Signin_form/> */}
        <Outlet />
          {/* <UserProfile userEmail={signedInUser.useremail} userName={signedInUser.username} /> */}
        {/* </Outlet> */}


      </UserContext.Provider>
    </>
  )
}

export default App