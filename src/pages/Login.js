import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: creds.email,
                password: creds.password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("email", creds.email);
            localStorage.setItem("authToken", data.authToken);
            navigate("/");
        } else {
            alert(data.errors);
        }
    };

    const changeHandler = (event) => {
        setCreds((prevCreds) => {
            return { ...prevCreds, [event.target.name]: event.target.value };
        });
    };

    return (
        <div className="container m-5">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={creds.email}
                        onChange={changeHandler}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={creds.password}
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/createuser" className="m-3 btn btn-danger">
                    I'm a new user
                </Link>
            </form>
        </div>
    );
}
