import React from "react";

export default function ShowLoader() {
    return (
        <>
            <div className="loader-center">
                <div className="spinner-border loader" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}