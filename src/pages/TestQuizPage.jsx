import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
import QuizPage from './QuizPage';

const TestQuizPage = () => {
  const videoRef=useRef()
    const axiosPublic= useAxiosPublic()
    const navigate= useNavigate()
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);
    const { courseId, quizName } = useParams();
    // const [name, setName]=useState('')
    // const [imageUrl, setImageUrl] = useState(''); 
    // const [studentId, setStudentId]=useState('')
    // const [email, setEmail]=useState('')
    // const [password, setPassword]=useState('')
    // const [role, setRole]=useState('')
    const {signUp,updateUserInfo,user}=useContext(AuthContext)
    // const nameRef= useRef(null)
    // const stdIdRef= useRef(null)
    const [showRegisterBtn, setShowRegisterBtn]=useState(false)
    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
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
       
        axiosPublic.post('/verifyFace',person)
        .then((result)=>{
            if(result.data.match){
              console.log(result);
              navigate(`/quizTest/${courseId}/${quizName}`)
                
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
              email: user.email,
              descriptor: Array.from(descriptor), 
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
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-100 text-black p-4 lg:p-0">
            <div className="text-center">
                {/* <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" /> */}
                <h3 className="text-2xl font-bold mb-2">Please Wait</h3>
                <p className="text-black">To attend the Quiz, First Verify Yourself</p>
                <video
                    ref={videoRef}
                    autoPlay
                    className="transform scale-x-[-1] border-2"
                    width="400"
                    height="300"
                />
                {
                 loading && <div>
                    <p className='text-White text-xl'>please stay still an look <br />at the Screen</p>
                    
                </div>
                }
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  {
                  loading ? 
                      <p className='text-black text-xl'>Detecting person...</p>:
                      <button
                          type="submit"
                          className="w-full bg-blue-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                      >
                          Enter Exam
                      </button>
                  }
                </form>
            </div>
        
        <Toaster />
    </div>
);
}

export default TestQuizPage;