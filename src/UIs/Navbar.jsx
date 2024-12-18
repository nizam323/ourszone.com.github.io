import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { app } from "../firebase";
import { UserContext } from "../App";
import SearchProfile from "../components/Search-profile";

const auth = getAuth(app);
const database = getDatabase(app);

function Navbar() {
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
    console.log("userData", userData);

    function handleSearch(e) {
        e.preventDefault();

        const regex = new RegExp(query, "i");

        let result = userData.filter((user) => regex.test(user.username));
        setSearchResult(result)
        setQueryResult(result)

        console.log("result", result);
        console.log("query", query);
    }

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%", }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">OursZone</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    handleSearch();
                                }}
                                onFocus={() => setShowSearch(true)}
                            />
                            {
                                showSearch &&
                                <div className="searching">
                                    <div className="close-searching" onClick={() => setShowSearch(false)}>X</div>
                                    {
                                        queryResult &&
                                        queryResult.map((items) => {
                                            return (
                                                <>
                                                    <SearchProfile proName={items.username} ProCity={items.city} proURL={items.profile_picture_URL} />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            }
                            <button
                                onClick={handleSearch}
                                className="btn btn-outline-light">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;