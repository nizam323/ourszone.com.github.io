import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Home() {


    return (
        <>

            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col col-lg-9 col-xl-8">
                            <div className="card">
                                <div className="rounded-top d-flex justify-content-center flex-row" style={{ backgroundColor: '#ffff', height: 'auto' }}>



                                    <Navbar />

                                </div>

                                <Outlet />

                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

export default Home;