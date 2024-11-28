import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AddAnnounce = () => {
    const axiosPublic= useAxiosPublic()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const topic= e.target.topic.value;
        const details= e.target.details.value;
        const announce= {topic,details}
        console.log(announce)

    }
    return (
        <div className='bg-blue-50 min-h-screen'>
            <p className="text-center text-2xl font-bold p-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                Add new Announcement
            </p>
            <form onSubmit={handleSubmit}>
                <p>Enter Announcement topic</p>
                <input
                        type="text"
                        name="topic"
                        placeholder="Enter Topic"
                        required 
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
                />
                <p>Enter Announcement Details</p>
                <input
                        type="text"
                        name="details"
                        placeholder="Enter Details"
                        required 
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
                />
                <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            </form>
        </div>
    );
};

export default AddAnnounce;