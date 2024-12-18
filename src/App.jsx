import React, { createContext, useState } from 'react';
import './App.css';
import './Responsive.css';
import UserProfile from "./components/User_profile";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Signin_form } from './UIs/Signin-form-comp.jsx';
import { Signup_form } from './UIs/Signup-form-comp.jsx';
import ErrorPage from './error-page.jsx';
import Home from './UIs/Home.jsx';
import Posts from './components/Posts.jsx';
import ProutectedRoutes from './protectedRoutes/ProutectedRoutes.jsx';
import Edit from "./components/Edit.jsx";
import CreatePost from './components/CreatePost.jsx';
import PublicProfile from './components/Public-profile.jsx';

export const UserContext = createContext();

function App() {
  // const [loginpageDisplay, setLoginpageDisplay] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState("");
  const [loader, setLoader] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/home",
      element:
        <ProutectedRoutes>
          <Home />
        </ProutectedRoutes>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "user",
          element:
            <ProutectedRoutes>
              < UserProfile />
            </ProutectedRoutes>
        },
        {
          path: "",
          element:
            <ProutectedRoutes>
              <Posts />
            </ProutectedRoutes>
          ,

        }
      ]
    },
    {
      path: "/",
      element:
        // <ProutectedRoutes>
        <Signin_form />,
      // </ProutectedRoutes>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element:
        // <ProutectedRoutes>
        <Signup_form />,
      // </ProutectedRoutes>,
    },
    {
      path: "/edit",
      element: <Edit />,
    },
    {
      path: "/create-post",
      element: <CreatePost />,
    },
  ]);

  return (
    <UserContext.Provider value={{
      searchResult, setSearchResult,
      isSignedIn, setIsSignedIn, signedInUser, setSignedInUser, loader, setLoader
    }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;