import React, { useState } from "react";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const AddCourseContent = () => {
  const cloudName = import.meta.env.VITE_cloudinaryCloudName;
  const uploadPreset = import.meta.env.VITE_cloudinaryUploadPreset;
  const axiosPublic= useAxiosPublic()
  const { id } = useParams();
  const [lectures, setLectures] = useState([
    { lectureName: "", fileUrl: "" },
  ]); // Manage fileUrl instead of file

  const [loading, setLoading] = useState(false); // Track loading state

  const handleInputChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };

  const handleFileUpload = async (file, index) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        formData
      );

      const updatedLectures = [...lectures];
      updatedLectures[index].fileUrl = response.data.secure_url;
      setLectures(updatedLectures);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLecture = () => {
    setLectures([...lectures, { lectureName: "", fileUrl: "" }]);
  };

  const handleSubmit = async () => {
    if (lectures.some((lecture) => !lecture.fileUrl)) {
      alert("Please wait until all files are uploaded.");
      return;
    }
    try {
      setLoading(true);
      // Send the array of lectures to the backend
      const result= await axiosPublic.post(`addCourseContent/${id}`, { lectures });
      console.log(result)
      alert("Course content added successfully!");
    } catch (error) {
      console.error("Error submitting course content:", error);
    } finally {
      setLoading(false);
    }
    // console.log(lectures)
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <p className="text-center text-2xl font-bold p-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
        Add new Course
      </p>

      {lectures.map((lecture, index) => (
        <div key={index} className="lecture-input flex justify-center my-5 gap-6">
          <div>
            <label
              htmlFor={`lectureName-${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Lecture Name
            </label>
            <input
              type="text"
              placeholder="Lecture Name"
              value={lecture.lectureName}
              onChange={(e) =>
                handleInputChange(index, "lectureName", e.target.value)
              }
              id={`lectureName-${index}`}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`courseOutline-${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload Lecture Content
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e.target.files[0], index)}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id={`courseOutline-${index}`}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center gap-6">
        <button
          onClick={handleAddLecture}
          type="button"
          className="my-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          + Add Lecture
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={loading}
          className={`my-5 ${
            loading ? "bg-gray-400" : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
          } text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddCourseContent;
