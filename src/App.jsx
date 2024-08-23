import { createContext, useState } from 'react'
import './App.css'
import './Responsive.css'
import Loginpage from './UIs/Signup-signin-page'
import { Signin_form } from './UIs/Signup-form-comp'

export const UserContext = createContext()

function App() {
  const [loginpageDisplay, setLoginpageDisplay] = useState(true);

  return (
    <>
      <UserContext.Provider value={{ loginpageDisplay, setLoginpageDisplay}}>
        {loginpageDisplay ? <Loginpage /> : <Signin_form />}
          <Loginpage />
      </UserContext.Provider>
    </>
  )
}

export default App
