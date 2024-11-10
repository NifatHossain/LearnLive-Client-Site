
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
// import logo from '../../public/';

const SignUp = () => {
    const videoRef=useRef()
    const axiosPublic= useAxiosPublic()
    const navigate= useNavigate()
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName]=useState('')
    const [studentId, setStudentId]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const {signUp,updateUserInfo}=useContext(AuthContext)
    // const nameRef= useRef(null)
    // const stdIdRef= useRef(null)
    const [showRegisterBtn, setShowRegisterBtn]=useState(false)
    const loadModels = async () => {
        const MODEL_URL = './models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
    };
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                videoRef.current.srcObject = mediaStream;
                setStream(mediaStream); // Store the MediaStream for later
            })
            .catch((err) => console.error(err));
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null); // Clear the stream from state
        }
    };
    const handleFormSubmit=(e)=>{
        e.preventDefault()
        // const name= nameRef.current.value
        // const stdId= stdIdRef.current.value
        // setName(name)
        // setStdId(stdId)
        registerPerson()
        // console.log(name, stdId)

    }
    const savePersonDescriptor = (person) => {
        // const registeredPersons = JSON.parse(localStorage.getItem('registeredPersons')) || [];
        // registeredPersons.push(person);
        // localStorage.setItem('registeredPersons', JSON.stringify(registeredPersons));
       
        axiosPublic.post('/addUser',person)
        .then((result)=>{
                if(result.data.insertedId){
                
                signUp(person.email, person.password)
                .then(result=>{
                    const user= result.user;
                    console.log(user)
                    const image= 'https://i.ibb.co.com/VY9Bfbt/Basic-Ui-28186-29.jpg'
                    updateUserInfo(person.name,image)
                    .then(()=>{
                        toast.success('Successfully Registered')
                        stopCamera();
                        navigate('/allCourses')
                    })
                    .catch(error=>{
                        console.log(error.message)
                        toast.error('failed to signUp')
                    })
                })
                .catch(error=>{
                    console.log(error.message)
                    toast.error('failed to signUp')
                })
                
            }
            else{
                toast.error(result.data.message)
                console.log(result.data.message)
                }
        })
        .catch((error)=>{
            console.log(error)
            toast.error("failed to save in database")
        })
    };
    const registerPerson = async () => {
        if (videoRef.current) {
          // Detect the face and get the descriptor
          const detection = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
      
          if (detection) {
            const { descriptor } = detection;
      
            // Save the descriptor along with a name or ID of the person
            const person = {
              name: name, // You can use input fields to get this value
              studentId: studentId,
              email: email,
              password: password,
              descriptor: Array.from(descriptor), // Convert to array to save as JSON
              role:'student'
            };
      
            // Save this data to a backend or local storage
            savePersonDescriptor(person);
          } else {
            console.log('No face detected for registration.');
          }
        }
    };
    const detectFaceInRealTime = async () => {
        if (videoRef.current) {
            const detection = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();
            if(detection){
                setLoading(false)
            }
            setShowRegisterBtn(!!detection); // Update faceDetected state based on detection result
        }
    };
    useEffect(()=>{
        startVideo()
        loadModels()
        const interval = setInterval(() => {
            detectFaceInRealTime();
        }, 500);

        return () => clearInterval(interval); // Clean up interval on component unmount
    },[])

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 lg:p-0">
            <div className="lg:w-3/5 w-full h-full lg:h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
                <div className="text-center">
                    {/* <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" /> */}
                    <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
                    <p className="text-gray-200">Please sign up to create an account.</p>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="transform scale-x-[-1] border-2"
                        width="400"
                        height="300"
                    />
                </div>
            </div>
            <div className="lg:w-2/5 w-full  bg-gray-200 p-8 rounded-lg shadow-lg mt-8 lg:mt-0 lg:h-[800px] flex flex-col justify-center">
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <h3 className="text-xl text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700 font-bold text-center underline">Sign Up</h3>
                    <p className="text-center text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">Create your account</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required  value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
                    />
                    <input
                        type="text"
                        name="StudentId"
                        placeholder="Your Unique Id"
                        required  value={studentId} onChange={(e) => setStudentId(e.target.value)}
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required  value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 mt-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password minimum 6 character"
                        required  value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400  text-gray-900"
                    />
                    {
                     loading ? 
                        <p className='text-black text-xl'>Detecting person...</p>:
                        <button
                            type="submit"
                            className="w-full bg-blue-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                        >
                            Sign Up
                        </button>
                    }
                    <p className="text-center mt-4 text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                    </p>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default SignUp;
