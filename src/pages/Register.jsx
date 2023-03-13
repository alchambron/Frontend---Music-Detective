import React, { useState } from 'react';
import useFetch from '../services/useFetch';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sendData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const apiURL = 'https://musicdetective.herokuapp.com/users';
        try {
            const data = await useFetch({ apiURL }, sendData);
            const token = data.token;

            Cookies.set("user_token", token);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            alert("An error occurred during the connection.");
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData.user,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
    )
}