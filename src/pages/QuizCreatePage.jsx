import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const QuizCreatePage = () => {
  const {id}=useParams()
  const navigate= useNavigate()
  const axiosPublic=useAxiosPublic()
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("mcq");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [normalAnswer, setNormalAnswer] = useState("");

  const handleAddQuestion = () => {
    const newQuestion =
      questionType === "mcq"
        ? {
            type: "mcq",
            question,
            options,
            correctAnswer,
          }
        : {
            type: "normal",
            question,
            answer: normalAnswer,
          };
    setQuestions([...questions, newQuestion]);
    // Clear the inputs
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setNormalAnswer("");
  };

  const handleSubmit = async () => {
    

    const quizObject = {
      quizName,
      quizQuestions: questions,
    };

    try {
      await axiosPublic.post(`/createQuiz/${id}`, quizObject);
      toast.success("Quiz saved successfully!");
      setQuizName("");
      setQuestions([]);
      navigate(`/courseDetails/${id}`)
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast.error("Failed to save quiz.");
    }
  };

  return (
    <div className="p-5 max-w-screen-md mx-auto bg-blue-50">
      <h1 className="text-2xl font-bold mb-5">Add Quiz</h1>

      {/* Quiz Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quiz Name</label>
        <input
          type="text"
          value={quizName}
          required
          onChange={(e) => setQuizName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter quiz name"
        />
      </div>

      {/* Question Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Question Type</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="mcq">MCQ</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Question */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="3"
        ></textarea>
      </div>

      {questionType === "mcq" && (
        <>
          {/* Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) =>
                  setOptions((prev) =>
                    prev.map((opt, i) => (i === index ? e.target.value : opt))
                  )
                }
                placeholder={`Option ${index + 1}`}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
              />
            ))}
          </div>

          {/* Correct Answer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </>
      )}

      {questionType === "normal" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <textarea
            value={normalAnswer}
            onChange={(e) => setNormalAnswer(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="2"
          ></textarea>
        </div>
      )}

      <button
        onClick={handleAddQuestion}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
      >
        Add Question
      </button>

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        {questions.map((q, index) => (
          <div key={index} className="border p-3 mb-2 rounded-md">
            <p className="font-bold">{q.question}</p>
            {q.type === "mcq" && (
              <ul className="list-disc pl-5">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}
            {q.type === "normal" && <p>Answer: {q.answer}</p>}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
      >
        Save Quiz
      </button>
      <Toaster/>
    </div>
  );
};

export default QuizCreatePage;