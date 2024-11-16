import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const {signIn}=useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formData;
        // if (!email || !password) {
        //     alert('Please fill in all fields');
        //     return;
        // }
        // const storedEmail = localStorage.getItem('email');
        // const storedPassword = localStorage.getItem('password');

        // if (email === storedEmail && password === storedPassword) {
        //     navigate('/profile');
        // } else {
        //     alert("worng,Try again");
        // }

        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);

        // setFormData({ email: '', password: '' });
        signIn(email,password)
        .then(result=>{
            const user= result.user;
            console.log(user);
            toast.success('Login Successful')
            navigate('/')
        })
        .catch(error=>{
            toast.error('login failed')
            console.log(error.message)
        })

    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center p-4">
            <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    {/* <img className='w-16 mx-auto' src="src/logo.jpeg" alt="logo" /> */}
                    <h2 className='text-3xl font-extrabold text-gray-800'>Hello!</h2>
                    <p className='mt-2 text-sm text-gray-600'>Welcome to LearnLive, Please log in.</p>
                </div>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Email address'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='current-password'
                            required
                            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='flex justify-center py-2 px-4 border border-transparent w-full text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='text-center mt-4'>
                    <p className='text-sm'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
