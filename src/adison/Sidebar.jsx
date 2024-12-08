// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
//       <div className="p-4 font-bold text-lg border-b border-gray-700">Summer 2024</div>
//       <nav className="flex flex-col mt-4">
//         <a href="#home" className="p-4 hover:bg-gray-700">Home</a>
//         <a href="#discussions" className="p-4 hover:bg-gray-700">Discussions</a>
//         <a href="#grades" className="p-4 hover:bg-gray-700">Grades</a>
//         <a href="#people" className="p-4 hover:bg-gray-700">People</a>
//         <a href="#pages" className="p-4 hover:bg-gray-700">Pages</a>
//         <a href="#files" className="p-4 hover:bg-gray-700">Files</a>
//         <a href="#syllabus" className="p-4 hover:bg-gray-700">Syllabus</a>
//         <a href="#modules" className="p-4 hover:bg-gray-700">Modules</a>
//         <a href="#collaborations" className="p-4 hover:bg-gray-700">Collaborations</a>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const Sidebar = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="flex">
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
          <div className="p-4 font-bold text-lg border-b border-gray-700">Summer 2024</div>
          <nav className="flex flex-col mt-4">
            <Link to="/sideBar" className="p-4 hover:bg-gray-700">Home</Link>
            <Link to="/sideBar/discussions" className="p-4 hover:bg-gray-700">Discussions</Link>
            <Link to="/sideBar/grades" className="p-4 hover:bg-gray-700">Grades</Link>
            <Link to="/sideBar/people" className="p-4 hover:bg-gray-700">People</Link>
            <Link to="/sideBar/pages" className="p-4 hover:bg-gray-700">Pages</Link>
            <Link to="/sideBar/files" className="p-4 hover:bg-gray-700">Files</Link>
            <Link to="/sideBar/syllabus" className="p-4 hover:bg-gray-700">Syllabus</Link>
            <Link to="/sideBar/modules" className="p-4 hover:bg-gray-700">Modules</Link>
            <Link to="/sideBar/collaborations" className="p-4 hover:bg-gray-700">Collaborations</Link>
          </nav>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


