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
    const uD = useSelector((s) => s.ussrData)

    useEffect(() => {

        // dispatch(isAuthCheck())
        console.log(uD);


        const isSignedIn = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                // console.log(user);
                // if (window.location.href == "http://localhost:5173/" || "http://localhost:5173/signup") {
                // navigate("/home");
                // }
            } else {
                setIsAuth(false);
                navigate("/");
            }
        });

        return () => isSignedIn();
    },
        // []
        [navigate]
    );

    if (isAuth === null) {
        return <ShowLoader />;
    }

    return (
        <>
            {isAuth ? children : null}
        </>
    );
}