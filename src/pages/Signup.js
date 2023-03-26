import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
    });

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/api/createuser", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: creds.name,
                email: creds.email,
                password: creds.password,
                location: creds.location,
            }),
        });

        const data = await response.json();

        if(response.ok) {
            navigate('/login');
        } else {
            alert(data.error);
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
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={creds.name}
                        onChange={changeHandler}
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={creds.location}
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/login" className="m-3 btn btn-danger">
                    Already a User
                </Link>
            </form>
        </div>
    );
}
