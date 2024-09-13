import React, { createContext, useState, useRef } from 'react';
import './App.css';
import './Responsive.css';
import UserProfile from "./components/User_profile";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Signin_form } from './UIs/Signin-form-comp.jsx';
import { Signup_form } from './UIs/Signup-form-comp.jsx';
import ErrorPage from './error-page.jsx';
import Home from './UIs/Home.jsx';
import Posts from './components/Posts.jsx';

export const UserContext = createContext();

function App() {
  const [loginpageDisplay, setLoginpageDisplay] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState("");
  let commentsBtn = useRef();

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "user",
          element:
            (isSignedIn && signedInUser ?
              (< UserProfile
                userName={signedInUser.username}
                userEmail={signedInUser.useremail}
              />) : <div className='d-flex justify-content-center align-items-center not-user' style={{
                width: "100%",
                height: "100vh",
              }}><span className='not-user-span'>Your Not SignedIn Please SignIn First</span></div>)

        },
        {
          path: "",
          element: <Posts />,

        }
      ]
    },
    {
      path: "/",
      element: <Signin_form />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup_form />,
    },
  ]);

  return (
    <UserContext.Provider value={{
      loginpageDisplay, setLoginpageDisplay,
      isSignedIn, setIsSignedIn, signedInUser, setSignedInUser, commentsBtn
    }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;