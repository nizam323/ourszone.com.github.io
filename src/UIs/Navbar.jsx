import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { app } from "../firebase";
import { UserContext } from "../App";
import SearchProfile from "../components/Search-profile";

const auth = getAuth(app);
const database = getDatabase(app);

function Navbar() {
    // const { id } = useParams();
    const [showSearch, setShowSearch] = useState(false);
    const [queryResult, setQueryResult] = useState([]);
    const [query, setQuery] = useState("");
    const [userData, setUserData] = useState("");
    const { setSearchResult } = useContext(UserContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(database, "users_info/"),
                    async (snapshot) => {
                        let userData = await snapshot.val();
                        setUserData(Object.values(userData));
                    })
            } else {
                setUserData(null)
            }
        })
    }, [])
    // console.log("userData", userData);

    function handleSearch(e) {
        e.preventDefault();
        const regex = new RegExp(query, "i");

        // if (query.trim() == "") return setQueryResult([]);

        // let result = queryResult1.filter((i) => 
        //     i.username.search(new RegExp(query, "i")) !== -1 // Regex with "i" for case-insensitivity
        // );


        let result = userData.filter((user) => regex.test(user.username));
        setSearchResult(result)
        setQueryResult(result)

        // console.log("result", result);
        // console.log("query", query);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%", }}>
                <div style={{ position: "relative" }} className="container-fluid">
                    <a className="navbar-brand" href="#">OursZone</a>
                    <button onClick={() => setShowSearch(false)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/home"} end className={({ isActive }) => isActive ? 'spotlight nav-link active' : 'nav-link'}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"user"} end className={({ isActive }) => isActive ? 'spotlight nav-link active' : 'nav-link'}>
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    handleSearch(e);
                                }}
                                onFocus={() => setShowSearch(true)}
                            />

                            <button
                                onClick={(e) => {
                                    setShowSearch(true);
                                    handleSearch(e);
                                }}
                                className="btn btn-outline-light">Search</button>
                        </form>
                    </div>

                </div>
            </nav>
            {
                showSearch &&
                <div className="searching">
                    <div style={{ textAlign: "end" }}>
                        <span className="close-searching" onClick={() => setShowSearch(false)}>X</span>
                    </div>
                    {
                        queryResult.length > 0 ?
                            queryResult.map((items) => {
                                return (
                                    <>
                                        <Link to={`/ours_zone/user_public_profile/${items.id}`}>
                                            <SearchProfile proName={items.username} ProCity={items.city} proURL={items.profile_picture_URL} />
                                        </Link>
                                    </>
                                )
                            }) :
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <h4 style={{
                                    color: "#ffffff",
                                    fontSize: "30px",
                                    fontWeight: "lighter",
                                    letterSpacing: "5px"
                                }}>No Result</h4>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default Navbar;