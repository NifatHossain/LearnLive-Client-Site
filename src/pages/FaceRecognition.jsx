import { useEffect, useRef } from "react";
import * as faceapi from 'face-api.js';
import { useState } from "react";

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef=useRef()
  const [loading, setLoading] = useState(true);
  const [age,setAge]=useState(0)
  const [gender,setGender]=useState('')
  const [mood, setMood]=useState('')
  const [detectedPerson,setDetectedPerson]=useState('')
  const loadModels = async () => {
      const MODEL_URL = './models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
  };
  
  // Load stored descriptors
  const loadStoredDescriptors = () => {
    const registeredPersons = JSON.parse(localStorage.getItem('registeredPersons')) || [];

    // Convert each stored descriptor back into a Float32Array
    return registeredPersons.map((person) => ({
      name: person?.name,
      stdId: person?.stdId,
      descriptor: new Float32Array(person.descriptor),
    }));
  };
  const recognizePerson = async () => {
    if (videoRef.current) {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (detection) {
        setLoading(false)
        const { descriptor } = detection;
        const storedDescriptors = loadStoredDescriptors();
  
        // Find the closest match
        const labeledDescriptors = storedDescriptors.map((person) => {
          return new faceapi.LabeledFaceDescriptors(
            person.name,
            [person.descriptor] // Wrap the descriptor in an array
          );
        });
  
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6); // 0.6 is the distance threshold
  
        // Find the best match for the current face descriptor
        const bestMatch = faceMatcher.findBestMatch(descriptor);
  
        if (bestMatch.label !== 'unknown') {
          console.log(`Recognized: ${bestMatch.label}`);
          setDetectedPerson(bestMatch.label)
          // Display the person's name or take some action
        } else {
          console.log('No match found');
        }
      }
    }
  };
  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (videoRef.current.srcObject = stream),
      (err) => console.error(err)
    );
  };
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
          .withFaceLandmarks()
          .withFaceExpressions().withFaceDescriptors().withAgeAndGender();
  
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };
        faceapi.matchDimensions(canvasRef.current, displaySize);
  
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, displaySize.width, displaySize.height);
  
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        resizedDetections.forEach((detection) => {
          const { age, gender, genderProbability,expressions } = detection;
          setAge(Math.round(age))
          setGender(gender)
          // Extract the most likely expression from the expressions object
          const expression = Object.entries(expressions).reduce(
            (max, [key, value]) => value > max.value ? { key, value } : max,
            { key: '', value: 0 }
          ).key;
          setMood(expression)
          
          const text = `${Math.round(age)} years, ${gender} (${(
            genderProbability * 100
          ).toFixed(1)}%)`;
          const { x, y } = detection.detection.box;
          context.fillStyle = '#ffffff';
          context.font = '16px Arial';
          context.fillText(text, x, y - 10);
        });
        // Call the recognition function
        recognizePerson();
      }
    }, 100);
  };
  
  useEffect(() => {
    startVideo();
    loadModels()
  }, []);
  return (
    <div className="flex justify-center">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          onPlay={handleVideoOnPlay}
          className="transform scale-x-[-1]"
          width="720"
          height="560"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
        />
      </div>
      <div className="text-xl font-medium">
        {
          loading? <p>Data loading...</p>: <div>
            <h2>Age: {age}</h2>
            <h2>Gender: {gender}</h2>
            <h2>Expression: {mood}</h2>
            <h2>Person: {detectedPerson}</h2>
          </div>
        }
      </div>
    </div>
  );
};

export default FaceRecognition;
