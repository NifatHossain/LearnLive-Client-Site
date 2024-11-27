import React from "react";

const CourseOutlines = () => {
  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-4">Course Outlines</h1>

      {/* Course Outline Section */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
        <p className="text-gray-600">
          Below is the outline of topics covered in this course. Follow the
          modules in sequence to gain the best learning experience.
        </p>
      </div>

      {/* Modules List */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Modules</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li className="mb-2">
            <span className="font-semibold">Module 1:</span> Introduction to the Course
          </li>
          <li className="mb-2">
            <span className="font-semibold">Module 2:</span> Basics of [Subject]
          </li>
          <li className="mb-2">
            <span className="font-semibold">Module 3:</span> Intermediate Concepts in [Subject]
          </li>
          <li className="mb-2">
            <span className="font-semibold">Module 4:</span> Advanced Techniques
          </li>
          <li className="mb-2">
            <span className="font-semibold">Module 5:</span> Final Project and Evaluation
          </li>
        </ul>
      </div>

      {/* Downloadable Resources */}
      <div className="bg-white shadow-md rounded p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Resources</h2>
        <p className="text-gray-600 mb-4">
          Download the complete course outline for offline reference:
        </p>
        <a
          href="/path-to-course-outline.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Download Course Outline (PDF)
        </a>
      </div>
    </div>
  );
};

export default CourseOutlines;
