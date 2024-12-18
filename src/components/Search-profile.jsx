import React from "react";

export default function SearchProfile({ proName, ProCity, proURL }) {
    return (
        <>
            <div className="search-pro-card-con">
                <img src={proURL ? proURL : "../../images/istockphoto-1300845620-612x612.jpg"} alt="profile image" />
                <div>
                    <h1>{proName ? proName : "Profile name"}</h1>
                    <h1 style={{ fontWeight: "lighter" }}>{ProCity ? ProCity : "City"}</h1>
                </div>
            </div>
        </>
    )
}