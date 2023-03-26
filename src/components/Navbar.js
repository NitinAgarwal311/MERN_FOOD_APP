import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../pages/Cart";
import CartContext from "../store/cart-context";

export default function Navbar(props) {
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const cartCtx = useContext(CartContext);

    const logoutHandler = () => {
        cartCtx.clearCart();    
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{width:"100vw"}}>
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
                                    to="/orders"
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
                            <div
                                className="btn bg-white text-primary mx-1 mt-1"
                                onClick={() => {
                                    setShowCart(true);
                                }}
                            >
                                My Cart
                            </div>
                            {showCart && (
                                <Cart onCloseModal={() => setShowCart(false)} />
                            )}
                            <div
                                className="btn bg-white text-danger mx-1 mt-1"
                                onClick={logoutHandler}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
