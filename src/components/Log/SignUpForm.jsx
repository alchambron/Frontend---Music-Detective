import React, { useState } from "react";
import useFetch from '../../services/useFetch'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const [form, setForm] = useState({
        user: {
            email: " ",
            password: " ",
        },
    });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            user: {
                ...form.user,
                [e.target.id]: e.target.value,
            },
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const sendData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(form),
        };
        const data = await useFetch(import.meta.env.VITE_BASE_URL + "/users/", sendData);
        const token = data.token;
        if (token == null || token == undefined) {
            setErrorMessage("Account creation failed.")
        } else {
            Cookies.set("user_token", token);
            navigate("/");
        }
    }

    return (
        <div>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name=""
                    id="email"
                    onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name=""
                    id="password"
                    onChange={handleChange} />
                <button type="submit">SIGN UP</button>
            </form>
            {errorMessage}
        </div>
    )
}