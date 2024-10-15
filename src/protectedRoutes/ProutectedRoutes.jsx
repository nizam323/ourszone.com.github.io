import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShowLoader from "../components/ShowLoader";
import { useSelector, useDispatch } from "react-redux";
import { isAuthCheck } from "../redux/slices/userDataSlice";

const auth = getAuth(app);

export default function ProutectedRoutes({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userIsAuth = useSelector((state) => state.userData);

    // useEffect(() => {
    //     // const cleanUp = () => {
    //     dispatch(isAuthCheck());
    //     if (userIsAuth.userIsAuth) {
    //         if (userIsAuth.userFound == true) {
    //             console.log("yes");

    //             setIsAuth(true);
    //             navigate("/home/user");

    //         }
    //     } else {
    //         setIsAuth(false);
    //         navigate("/");
    //     }
    //     // }
    //     // return () => cleanUp();
    // }, []);

    useEffect(() => {
        // dispatch(isAuthCheck())
        const isSignedIn = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setIsAuth(true);
                // if (window.location.href == "http://localhost:5173/" || "http://localhost:5173/signup") {
                // navigate("/home");
                // }
            }
            else {
                setIsAuth(false);
                navigate("/");
            }
        });
        return () => isSignedIn();
    }, [navigate]);

    if (isAuth === null) {
        return <ShowLoader />;
    }

    return (
        <>
            {isAuth ? children : null}
        </>
    );
}