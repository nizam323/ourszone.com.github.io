import React from "react";

export default function Alert({ text, icon }) {
    return (
        <>
            <div className="loader-center">
                <div className="d-flex justify-content-center" style={{ position: "absolute", width: "100%" }}>
                    <div className="alert alert-success d-flex align-items-center" role="alert" style={{
                        position: "absolute", zIndex: "2", backgroundColor: "#e75348"
                    }}>
                        <span className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                            {icon}
                        </span>
                        <div style={{ color: "wheat" }}>
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}