import React, { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const axiosPublic=useAxiosPublic()
    const navigate= useNavigate()
    const [imgLoading, setImgLoading]=useState(true)
    const [fileLoading, setFileLoading]=useState(true)
    const [courseImageURL,setCourseImageURL]= useState(null)
    const [courseOutlineFileURL,setCourseOutlineFileURL]= useState(null)
    const imageHostingKey = import.meta.env.VITE_imageHostingKey
    const imageHostingApi= `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const cloudName = import.meta.env.VITE_cloudinaryCloudName
    const uploadPreset = import.meta.env.VITE_cloudinaryUploadPreset
    const handleImageChange=async(e)=>{
        const courseImage= e.target.files[0]
        if(courseImage){
            const courseImageData= new FormData()
            courseImageData.append('image',courseImage)
            try {
                const result = await axiosPublic.post(imageHostingApi, courseImageData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                const image = result.data.data.display_url;
                setCourseImageURL(image)
                setImgLoading(false)
                console.log("Uploaded image URL:", image);
            } catch (error) {
                console.error("Error uploading file:", error.response?.data || error.message);
            }
        }
    }
    const handleFileChange=async(e)=>{
        const courseOutline=e.target.files[0]
        if(courseOutline){
            const courseOutlineData= new FormData()
            courseOutlineData.append('file',courseOutline)
            courseOutlineData.append('cloud_name',cloudName)
            courseOutlineData.append('upload_preset',uploadPreset)
            const result= await axiosPublic.post(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,courseOutlineData)
            const fileURL= result.data.url;
            console.log(fileURL)
            setCourseOutlineFileURL(fileURL)
            setFileLoading(false)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const courseCode= e.target.courseCode.value;
        const courseName= e.target.courseName.value;
        const deptName= e.target.deptName.value;
        const instructorName=e.target.instructorName.value;
        const instructorEmail=e.target.instructorEmail.value;
        const creditCount= e.target.creditCount.value;
        const courseDescription=e.target.courseDescription.value;
        const learningOutcome= e.target.learningOutcome.value;
        
        
        const courseData= {courseCode,courseName,deptName,instructorName,instructorEmail,creditCount,courseDescription,learningOutcome,courseImageURL,courseOutlineFileURL}
        console.log(courseData)
        axiosPublic.post('/addCourse',courseData)
        .then((result)=>{
                if(result.data.insertedId){
                toast.success('Successfully added course')
                navigate('/allCourses')
                }
        })
        .catch((error)=>{
            toast.error('Failed to add course')
            console.log(error)
        })
    }
    return (
        <div className='bg-blue-50 min-h-screen'>
            <p className='text-center text-2xl font-bold p-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white'>Add new Course</p>
            

            <form onSubmit={handleSubmit} className=" mx-auto bg-blue-50 py-10">
                <div className='flex flex-col md:flex-row justify-center gap-5'>
                    <div className='min-w-96'>
                        <div class="mb-5">
                            <label for="courseCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course Code</label>
                            <input type="text" id="courseCode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex: CSE299" required />
                        </div>
                        <div className="mb-5">
                            <label for="courseName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                            <input type="text" id="courseName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label for="deptName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department Name</label>
                            <input type="text" id="deptName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label for="instructorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor Name</label>
                            <input type="text" id="instructorName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label for="instructorEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor Email</label>
                            <input type="email" id="instructorEmail" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                    </div>

                    <div className='min-w-96'>
                        <div className="mb-5">
                            <label for="creditCount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course credit</label>
                            <input type="number" id="creditCount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label for="courseDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course Description</label>
                            <input type="text" id="courseDescription" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label for="learningOutcome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Learning OutCome</label>
                            <input type="text" id="learningOutcome" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            {/* <label for="courseOutline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter course Outline link</label> */}
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="courseImage">Upload Course Image</label>
                            <input onChange={handleImageChange} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="courseImage" type="file"/>                        
                        </div>
                        <div className="mb-5">
                            {/* <label for="courseOutline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter course Outline link</label> */}
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="courseOutline">Upload Course outline</label>
                            <input onChange={handleFileChange} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name='courseOutline' id="courseOutline" type="file"/>                        
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type="submit" disabled={imgLoading || fileLoading} className={`${ (imgLoading || fileLoading) ? 'opacity-50 cursor-not-allowed' : ''} text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Submit
                    </button>                
                </div>
            </form>
        <Toaster/>
        </div>
    );
};

export default AddCourse;