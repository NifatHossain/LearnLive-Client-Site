import React, { useState } from 'react';
import useCourseDetails from '../hooks/useCourseDetails';
import { useParams } from 'react-router-dom';
import { BsPersonWorkspace } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { PiClockCountdownBold } from "react-icons/pi";

const CourseDetails = () => {
  const { id } = useParams();
  const [isLoading, courseDetails,refetch] = useCourseDetails(id);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("Overview");
  
  function transformDriveLink(link) {
    if (!link.includes("view?usp=sharing")) {
      throw new Error("Invalid Google Drive link format.");
    }
  
    const fileIdMatch = link.match(/\/d\/(.*?)\/view\?/);
    if (!fileIdMatch || fileIdMatch.length < 2) {
      throw new Error("Could not extract the file ID from the link.");
    }
  
    const fileId = fileIdMatch[1];
  
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <div>
            <h2 className='text-2xl font-bold'>Course Description</h2>
            <p className="p-4">{courseDetails.courseDescription}</p>
            <h2 className='text-2xl font-bold'>What you will learn</h2>
            <p className="p-4">{courseDetails.learningOutcome}</p>
        </div> 
      case "Curriculumn":
        return <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Course Curriculum</h3>
        {/* {
            const pdfLink = transformDriveLink(courseDetails.courseOutline);
        } */}
        <iframe
          src={
            courseDetails.courseOutlineFileURL.endsWith(".docx")
              ? `https://docs.google.com/gview?url=${courseDetails.courseOutlineFileURL}&embedded=true`
              : courseDetails.courseOutlineFileURL
          }
          width="100%"
          height="600px"
          className="border"
          allow="autoplay"
          title="Course Curriculum"
        ></iframe>
      </div>
      case "Instructor":
        return (
          <div className="p-4">
            <p><strong>Instructor Name:</strong> {courseDetails.instructorName}</p>
            <p>Details about the instructor go here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    !isLoading &&<div>
      <div className="min-h-64 bg-slate-100">
        <p className="max-w-screen-md ml-5 md:ml-[20%] pt-5 md:pt-[6%] text-3xl font-bold">
          {courseDetails.courseName}
        </p>
        <div className="ml-5 md:ml-[20%] pt-5 flex flex-col md:flex-row gap-4">
          <span className="flex items-center gap-2">
            <BsPersonWorkspace className="text-blue-700 text-xl" /> {courseDetails.instructorName} |
          </span>
          <span className="flex items-center gap-2">
            <BsGlobe className="text-blue-700 text-xl" /> Department: {courseDetails.deptName} |
          </span>
          <span className="flex items-center gap-2">
            <PiClockCountdownBold className="text-blue-700 text-xl" /> Credit: {courseDetails.creditCount}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {["Overview", "Curriculumn", "Instructor"].map((tab) => (
            <li key={tab} className="me-2">
              <button
                onClick={() => setActiveTab(tab)}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 p-4">{renderTabContent()}</div>
    </div>
  );
};

export default CourseDetails;
