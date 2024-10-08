import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShowLoader from "../components/ShowLoader";

const auth = getAuth(app);

export default function ProutectedRoutes({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const isSignedIn = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                // console.log(user);
            } else {
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