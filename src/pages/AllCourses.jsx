import React from 'react';
import useAllCourse from '../hooks/useAllCourse';
import { Link } from 'react-router-dom';

const AllCourses = () => {
    const [isLoading, courses, refetch]=useAllCourse()
    console.log(courses.length)
    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className='py-10 bg-gradient-to-br from-purple-600 to-blue-500  text-white font-semibold'>
                <h1 className='ml-10 text-3xl'>Courses</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-full ml-2 md:ml-12'>
            {
                !isLoading ? courses.map((course)=><div key={course._id} className='flex justify-center py-5'>
                <div className='grid md:grid-cols-3 gap-4'>
                    <div className="card card-compact bg-base-100  md:w-80 lg:w-96 shadow-xl">
                        <figure>
                            <img
                            className='lg:h-64 lg:w-full'
                            src={course?.courseImageURL || 'https://i.ibb.co.com/LpWc6vD/9d3f66c14f2c23631c17999c61f2a076.jpg'}
                            alt="course image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{course?.courseCode}</h2>
                            <p>Teacher: {course?.instructorName}</p>
                            <div className="card-actions justify-end">
                            <Link to={`/courseDetails/${course._id}`} ><button className="btn bg-gradient-to-br from-purple-600 to-blue-500 text-white">Details</button></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>):<div className='min-h-96 min-w-full flex items-center justify-center'>
                <div class="text-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </div>
            </div>
            }
            </div>
        </div>
    );
};

export default AllCourses;