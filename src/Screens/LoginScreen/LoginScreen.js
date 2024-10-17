import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
            .then((response) => {
                console.log(response.data);
                Cookies.set('auth_token', response.data.token, { expires: 1, path: '/' }); // Expires in 1 day, adjust as needed
                Cookies.set('user_data', JSON.stringify(response.data), { expires: 1, path: '/' }); // Expires in 1 day, adjust as needed
                window.location.href = '/';
            })
            .catch((error) => {
                console.error(error);
            });


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6 justify-between flex">
                        <div>
                            <a href="/forgot-password" className="text-indigo-600 hover:underline">Forgot password?</a>
                        </div>
                        <div>
                            <a href="/register" className="text-indigo-600 hover:underline">Register</a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;