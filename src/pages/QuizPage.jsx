import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useCourseContent from "../hooks/useCourseContent";

const QuizPage = () => {
  const { courseId, quizName } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Store the selected quiz
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [modalMessage, setModalMessage] = useState("quiz");
  const [examStarted, setExamStarted] = useState(false);
  const [examTerminated, setExamTerminated] = useState(false);
  const [isLoading,courseContents,refetch] = useCourseContent(courseId);
  const examRef = useRef(null);

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

  // Submit quiz
  const handleSubmit = () => {
    setExamStarted(false);
    const submission = {
      courseId,
      quizName,
      answers, // Store answers for submission
    };
    console.log("Submitted Answers:", submission);

    if (examTerminated) {
      setModalMessage(
        "Your exam was terminated due to leaving the quiz. Your answers have been submitted."
      );
    } else {
      setModalMessage("Your answers have been successfully submitted.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 relative">
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
