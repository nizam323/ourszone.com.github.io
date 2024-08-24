import { createContext, useState } from 'react'
import './App.css'
import './Responsive.css'
import Loginpage from './UIs/Signup-signin-page'
import UserProfile from "./components/User_profile";
import { customContext } from './context/context.js'

export const UserContext = createContext()

function App() {
  const [loginpageDisplay, setLoginpageDisplay] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState("");

  return (
    <>
      <UserContext.Provider value={{ loginpageDisplay, setLoginpageDisplay, isSignedIn, setIsSignedIn, signedInUser, setSignedInUser }}>

        {loginpageDisplay === false ?
          isSignedIn && signedInUser && (
            < UserProfile
              userName={signedInUser.username}
              userEmail={signedInUser.useremail}
            />) : <Loginpage />
        }

      </UserContext.Provider>
    </>
  )
}

export default App