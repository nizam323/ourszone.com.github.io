// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <Signin_form />,
//       }
//     ]
//   },
//   {
//     path: "/signup",
//     element: <Signup_form />
//   },
//   {
//     path: "/user",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <UserProfile
//           userEmail={"aaaaa"} userName={"aaaaa"}
//           // userName={signedInUser.username}
//           // userEmail={signedInUser.useremail}
//         />,
//       }
//     ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <App> */}
//     <RouterProvider router={router} />
//     {/* </App> */}
//   </React.StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// function Con() {
// const {
//   loginpageDisplay, setLoginpageDisplay,
//   isSignedIn, setIsSignedIn, signedInUser, setSignedInUser
// } = useContext(UserContext);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Signin_form />,
//       // element: <App />,
//       errorElement: <ErrorPage />,
//       // children: [
//         // {
//           // path: "",
//           // element: <Signin_form />,
//         // },
//       // ],
//     },
//     {
//       path: "/signup",
//       element: <Signup_form />,
//     },
//     {
//       path: "/user",
//       element: (
//         <UserProfile
//           userName={signedInUser.username}
//           userEmail={signedInUser.useremail}
//         />),
//       // element: <App />,
//       // children: [
//         // {
//           // path: "",
//           // element: (
//           //   <UserProfile
//           //     userName={signedInUser.username}
//           //     userEmail={signedInUser.useremail}
//           //   />
//           // ),
//         // },
//       // ],
//     },
//   ]);

//   return <RouterProvider router={router} />
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);