import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourseContent from "../hooks/useCourseContent";
import * as faceapi from 'face-api.js';
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";


const QuizPage = () => {
  const videoRef=useRef()
  const [stream, setStream] = useState(null);
  const { courseId, quizName } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Store the selected quiz
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [modalMessage, setModalMessage] = useState("quiz");
  const [examStarted, setExamStarted] = useState(false);
  const [examTerminated, setExamTerminated] = useState(false);
  const [faceIssueExamTerminated, setFaceIssueExamTerminated]=useState(false)
  const [isLoading,courseContents,refetch] = useCourseContent(courseId);
  const examRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const {user}=useContext(AuthContext)
  const axiosPublic=useAxiosPublic()
  const [totalScore, setTotalScore]=useState(0)
  const navigate= useNavigate()


  const loadModels=async()=>{
    const MODEL_URL='/models';
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
  }
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
  const savePersonDescriptor = (person) => {
    // const registeredPersons = JSON.parse(localStorage.getItem('registeredPersons')) || [];
    // registeredPersons.push(person);
    // localStorage.setItem('registeredPersons', JSON.stringify(registeredPersons));
   
    axiosPublic.post('/verifyFace',person)
    .then((result)=>{
        if(result.data.match){
          console.log(result);
          // navigate(`/quizTest/${courseId}/${quizName}`)
            
        }
        else{
            toast.error('face data mismatched')
            setFaceIssueExamTerminated(true)
            handleSubmit();
            stopCamera()
        }
    })
    .catch((error)=>{
        console.log(error)
        toast.error("failed to check facedata from database")
    })
};
  const detectFaceInRealTime = async () => {
    if (videoRef.current) {
        const detection = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
        
        if (detection) {
          console.log('detected successfully')
          setLoading(false)
          const { descriptor } = detection;
    
          // Save the descriptor along with a name or ID of the person
          const person = {
            email: user.email,
            descriptor: Array.from(descriptor), 
          };
    
          // Save this data to a backend or local storage
          savePersonDescriptor(person);
        } else {
          console.log('No face detected during exam.');
          setFaceIssueExamTerminated(true)
          handleSubmit();
          stopCamera()
        }
        // setShowRegisterBtn(!!detection); // Update faceDetected state based on detection result
    }
};
useEffect(() => {
  let interval;
  if (modalMessage === null && examStarted) {
    startVideo();
    loadModels();
    interval = setInterval(() => {
      detectFaceInRealTime();
    }, 3000); // 3 seconds
  }
  return () => {
    clearInterval(interval);
  };
}, [modalMessage, examStarted]);
  // Timer logic
  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleSubmit(); // Auto-submit on timer end
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examStarted]);

  // Find and set the quiz data
  useEffect(() => {
    if (!isLoading && courseContents?.quizes) {
      const quiz = courseContents.quizes.find((q) => q.quizName === quizName);
      setSelectedQuiz(quiz || null);
    }
  }, [courseContents, quizName, isLoading]);

  // Handle visibility changes (tab changes)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && examStarted) {
        setExamTerminated(true);
        handleSubmit();
        stopCamera()
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examStarted]);

  // Handle option selection
  const handleOptionClick = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };
  const calculateScore = () => {
    const questions = selectedQuiz.quizQuestions;
    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    return score;
  };
  // Submit quiz
  const handleSubmit = async() => {
    setExamStarted(false);
    const score = calculateScore();
    setTotalScore(score)
    const submission = {
      courseId:courseId,
      quizName:quizName,
      answers:answers, // Store answers for submission
      score:score,
    };
    const result= await axiosPublic.post(`/addSubmission/${user.email}`,submission)
    if (result.status === 200) {
      console.log("Result stored successfully");
    } else {
      console.log("Result was not stored successfully");
    }
    console.log("Submitted Answers:", submission);
    
    if(examTerminated) {
      setModalMessage(
        `Your exam was terminated due to leaving the quiz. Your score is: ${score}/${selectedQuiz.quizQuestions.length}`
      );
    } 
    else if(faceIssueExamTerminated){
      setModalMessage(`Your exam was terminated since Face recognition failed. Your score is: ${score}/${selectedQuiz.quizQuestions.length}`);
    }
    else {
      setModalMessage(`Your answers have been successfully submitted  Your score is: ${score}/${selectedQuiz.quizQuestions.length}`);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 relative">
      {
        (modalMessage==null) && <div>
          <video
              ref={videoRef}
              autoPlay
              className="transform scale-x-[-1] border-2 fixed bottom-4 left-4 w-40 h-30"
              width="400"
              height="300"
          />
        </div>
      }
      {/* Modal */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96 text-center">
            <p className="text-gray-800">
              {modalMessage === "quiz"
                ? "Quizzes are sensitive assessments. Your camera must remain on, and any browser tab switches or external actions will result in termination."
                : modalMessage}
            </p>
            <button
              onClick={() => {
                if (modalMessage === "quiz") {
                  setModalMessage(null);
                  setExamStarted(true);
                } else {
                  setModalMessage(null);
                  navigate(`/courseContent/${courseId}`)
                }
              }}
              className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {modalMessage === "quiz" ? "Okay" : "Close"}
            </button>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      {examStarted && selectedQuiz && (
        <>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">{selectedQuiz.quizName}</h1>
            <p className="text-lg text-red-500 font-semibold">
              Time Left: {formatTime(timeLeft)}
            </p>
          </div>
          <div className="space-y-8" ref={examRef}>
            {selectedQuiz.quizQuestions.map((question, idx) => (
              <div key={idx} className="bg-white p-5 rounded shadow-lg">
                <h2 className="font-semibold text-lg mb-3">
                  {idx + 1}. {question.question}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      onClick={() => handleOptionClick(idx, option)}
                      className={`cursor-pointer border p-3 rounded ${
                        answers[idx] === option
                          ? "bg-green-200"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="btn bg-green-500 hover:bg-green-700 text-white px-6 py-2 mt-5 rounded block ml-auto"
          >
            Submit Quiz
          </button>
        </>
      )}

      {!examStarted && !selectedQuiz && !isLoading && (
        <p>No quiz found with the given name.</p>
      )}
    </div>
  );
};

export default QuizPage;