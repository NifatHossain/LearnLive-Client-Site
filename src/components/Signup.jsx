import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../public/';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 lg:p-0">
            <div className="lg:w-3/5 w-full h-full lg:h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
                <div className="text-center">
                    {/* <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" /> */}
                    <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
                    <p className="text-gray-200">Please sign up to create an account.</p>
                </div>
            </div>
            <div className="lg:w-2/5 w-full  bg-gray-200 p-8 rounded-lg shadow-lg mt-8 lg:mt-0 lg:h-[800px] flex flex-col justify-center">
                <form className="space-y-4" onSubmit={handleSignUp}>
                    <h3 className="text-xl text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700 font-bold text-center underline">Sign Up</h3>
                    <p className="text-center text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">Create your account</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400  text-gray-900"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        Sign Up
                    </button>
                    <p className="text-center mt-4 text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
