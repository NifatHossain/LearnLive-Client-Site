import React from "react";

const Welcome = () => {
  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Platform</h1>

      {/* Welcome Message */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Hello, Learner!</h2>
        <p className="text-gray-600">
          We are excited to have you here. This platform is designed to help you
          achieve your learning goals with interactive content, virtual
          classrooms, and a supportive community.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li className="mb-2">Live virtual classroom sessions</li>
          <li className="mb-2">Comprehensive course outlines</li>
          <li className="mb-2">Interactive assignments and projects</li>
          <li className="mb-2">Community-driven discussions and support</li>
        </ul>
      </div>

      {/* Getting Started Section */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Get Started</h2>
        <p className="text-gray-600 mb-4">
          Start your journey by exploring the course outline or joining a live
          virtual classroom session.
        </p>
        <div className="space-x-4">
          <a
            href=""
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            View Course Outline
          </a>
          <a
            href=""
            className="inline-block bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
          >
            Join Virtual Classroom
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
