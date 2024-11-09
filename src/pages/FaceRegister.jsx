import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRegister = () => {
    const videoRef=useRef()
    const [loading, setLoading] = useState(true);
    const [name, setName]=useState('')
    const [stdId, setStdId]=useState('')
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
        navigator.getUserMedia(
          { video: {} },
          (stream) => (videoRef.current.srcObject = stream),
          (err) => console.error(err)
        );
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
        const registeredPersons = JSON.parse(localStorage.getItem('registeredPersons')) || [];
        registeredPersons.push(person);
        localStorage.setItem('registeredPersons', JSON.stringify(registeredPersons));
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
              stdId: stdId,
              descriptor: Array.from(descriptor), // Convert to array to save as JSON
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
        <div className='bg-green-100 min-h-screen'>
            <h2 className='text-center text-2xl font-bold text-orange-400'>Registration Page</h2>
            <div className='grid grid-cols-1'>
                <div>
                    <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input type="text" name='name' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required  value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Student Id</label>
                        <input type="text" name='stdId' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  value={stdId} onChange={(e) => setStdId(e.target.value)} />
                        <div className='flex justify-center mt-5'>
                            <video
                                ref={videoRef}
                                autoPlay
                                className="transform scale-x-[-1] border-2"
                                width="400"
                                height="300"
                            />
                        </div>
                    </div>
                    {
                     loading ? (
                        <p>Detecting person...</p>
                      ) : <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    
                    }
                    </form>
                </div>
                
            </div>

        </div>
    );
};

export default FaceRegister;