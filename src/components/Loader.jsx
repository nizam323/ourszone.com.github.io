import React from "react";

export default function Loader({ children }) {
    return (
        <>
            <div className="loader-con">
                {children}
            </div>
        </>
    )
}