import React from "react";

const VirtualClassroom = () => {
  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-4">Virtual Classroom</h1>

      {/* Video Meeting Section */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Join the Meeting</h2>
        <p className="text-gray-600 mb-4">
          Click the link below to join the live virtual classroom session:
        </p>
        <a
          href="https://your-video-platform-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Join Virtual Classroom
        </a>
      </div>

      {/* Chatbox Section */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Classroom Chat</h2>
        <div className="h-48 border rounded overflow-y-auto p-2 bg-gray-50">
          <p className="text-gray-500">No messages yet. Start chatting below!</p>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="mt-2 w-full p-2 border rounded"
        />
      </div>

      {/* File Sharing Section */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Share Files</h2>
        <p className="text-gray-600 mb-4">
          Upload and share files with the class:
        </p>
        <input
          type="file"
          className="block w-full border rounded p-2"
          accept="image/*,application/pdf"
        />
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: Images, PDFs
        </p>
      </div>
    </div>
  );
};

export default VirtualClassroom;
