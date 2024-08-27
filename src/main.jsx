import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from "./error-page";
// import Loginpage from './UIs/Signup-signin-page'
import { Signin_form } from './UIs/Signin-form-comp.jsx'
import { Signup_form } from './UIs/Signup-form-comp.jsx'
import UserProfile from './components/User_profile.jsx'
import { UserContext } from './App.jsx'

// const {
//   loginpageDisplay, setLoginpageDisplay,
//   isSignedIn, setIsSignedIn, signedInUser, setSignedInUser
// } = useContext(UserContext);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Signin_form />,
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup_form />
  },
  {
    path: "/user",
    element: <App />,
    children: [
      {
        path: "",
        element: <UserProfile
          //userEmail={"aaaaa"} userName={"aaaaa"}
          // userName={signedInUser.username}
          // userEmail={signedInUser.useremail}
        />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App> */}
    <RouterProvider router={router} />
    {/* </App> */}
  </React.StrictMode>,
)
