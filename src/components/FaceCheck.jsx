import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceCheck = ({ modalMessage, setPersonIdenified, expectedDescriptor }) => {
    const videoRef = useRef();
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadModels = async () => {
        const MODEL_URL = './models';
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ]);
        } catch (error) {
            console.error("Error loading models:", error);
        }
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    setStream(mediaStream);
                } else {
                    console.error("Video element is not ready.");
                }
            })
            .catch((err) => console.error(err));
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const isExpectedPerson = (detectedDescriptor) => {
        const distance = faceapi.euclideanDistance(detectedDescriptor, expectedDescriptor);
        return distance < 0.6; // Adjust threshold as needed
    };

    const detectFaceInRealTime = async () => {
        if (videoRef.current) {
            const detection = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();
            if (detection) {
                const { descriptor } = detection;
                if (isExpectedPerson(descriptor)) {
                    setLoading(false);
                    setPersonIdenified(true);
                } else {
                    console.log("Unexpected person detected!");
                    stopCamera(); // Stop camera if person is not identified
                }
            }
        }
    };

    useEffect(() => {
        if (!modalMessage) {
            startVideo();
            loadModels();
        }
        const interval = setInterval(() => {
            if (!modalMessage) {
                detectFaceInRealTime();
            }
        }, 12000); // Run detection every 12 seconds

        return () => clearInterval(interval);
    }, [modalMessage]);

    return (
        <div>
            {!modalMessage && (
                <div className="lg:w-3/5 w-full h-full lg:h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Please Wait!</h3>
                        <p className="text-gray-200">You can continue the exam after face recognition is successful.</p>
                        <video
                            ref={videoRef}
                            autoPlay
                            className="transform scale-x-[-1] border-2 fixed bottom-4 left-4 w-40 h-30"
                            width="400"
                            height="300"
                        />
                        {loading && (
                            <div>
                                <p className="text-white text-xl">
                                    Please stay still and look <br /> at the camera properly <br /> Detecting...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaceCheck;