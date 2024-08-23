import React, { useState } from "react";

function UserProfile({ userName, userEmail }) {

    const [city, setCity] = useState("")
    const [status, setStatus] = useState("")
    const [profession, setProfession] = useState("")
    const [proSrc, setProSrc] = useState("")
    const [name, setName] = useState("")

    function edit_name() {
        let name = prompt("Enter Your Name");
        setName(name)
    }

    function curd() {
        let proSrc = prompt("Enter Your profile URL");
        setProSrc(proSrc)
    }

    function edit_about1() {
        let profession = prompt("Enter Your Profession");
        setProfession(profession)
    }
    function edit_about2() {
        let city = prompt("Enter City");
        setCity(city)
    }
    function edit_about3() {
        let status = prompt("Enter Your Status");
        setStatus(status)
    }




    return (
        <>
            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col col-lg-9 col-xl-8">
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img
                                            src={proSrc || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                                            alt="Your Profile Photo"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', height: '100%', zIndex: 1 }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark text-body"
                                            style={{ zIndex: 1 }}
                                            onClick={curd}
                                        >
                                            Edit profile
                                        </button>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5 className="about-edit" onClick={edit_name}>{name.trim() !== "" ? name : userName}</h5>
                                        <p>{userEmail}</p>
                                    </div>
                                </div>
                                <div className="p-4 text-black bg-body-tertiary">
                                    <div className="d-flex justify-content-end text-center py-1 text-body">
                                        {/* <div>
                                            <p className="mb-1 h5">0</p>
                                            <p className="small text-muted mb-0">Photos</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">0</p>
                                            <p className="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">0</p>
                                            <p className="small text-muted mb-0">Following</p>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5 text-body">
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-4 bg-body-tertiary">
                                            <p className="font-italic mb-1 about-edit" onClick={edit_about1}>{profession || 'Your Profession'}</p>
                                            <p className="font-italic mb-1 about-edit" onClick={edit_about2}>{`Lives in ${city}` || "Your City"}</p>
                                            <p className="font-italic mb-0 about-edit" onClick={edit_about3}>{status || "Your Status"}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                                        <p className="lead fw-normal mb-0">Recent photos</p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 2"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 3"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 4"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfile;
