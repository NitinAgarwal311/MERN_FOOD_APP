import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">
                    GoFood
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-1">
                        <li className="nav-item">
                            <Link
                                className="nav-link active fs-5"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        {localStorage.getItem("authToken") && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link active fs-5"
                                    aria-current="page"
                                    to="/myorders"
                                >
                                    My Orders
                                </Link>
                            </li>
                        )}
                    </ul>
                    {!localStorage.getItem("authToken") && (
                        <div className="d-flex">
                            <Link
                                className="btn bg-white text-primary mx-1 mt-1"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="btn bg-white text-primary mx-1 mt-1"
                                to="/createuser"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                    {localStorage.getItem("authToken") && (
                        <div className="d-flex">
                            <div className="btn bg-white text-primary mx-1 mt-1">
                                My Cart
                            </div>

                            <div className="btn bg-white text-danger mx-1 mt-1" onClick={logoutHandler}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
