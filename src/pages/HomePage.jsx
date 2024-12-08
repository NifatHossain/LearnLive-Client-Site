import React from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className=" min-h-screen bg-cover bg-no-repeat bg-[url('https://dtlmselementor.wpengine.com/wp-content/uploads/2023/11/fullscreen-slider.jpg')]">
            
            <div className='pt-40'>
                <SearchBar></SearchBar>
            </div>
            <h2 className='text-center text-xl font-semibold my-5'>We have the largest collection of courses</h2>
            <div className='flex justify-center'>
                <Link to={'/allCourses'} className='text-xl  text-center bg-blue-700 p-2 text-white rounded-md'>View all courses</Link>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-around py-20'>
                <h2 className='rounded-b-md p-4 border-b-4 border-green-700 text-black text-2xl font-extrabold text-center w-fit'>320 <br /> courses </h2>
                <h2 className='rounded-b-md p-4 border-b-4 border-green-700 text-black text-2xl font-extrabold text-center w-fit'>3200+ <br /> Students </h2>
                <h2 className='rounded-b-md p-4 border-b-4 border-green-700 text-black text-2xl font-extrabold text-center w-fit'>100+  <br /> teachers  </h2>
                <h2 className='rounded-b-md p-4 border-b-4 border-green-700 text-black text-2xl font-extrabold text-center w-fit'>10  <br /> Subjects </h2>
            </div>
        </div>
    );
};

export default HomePage;