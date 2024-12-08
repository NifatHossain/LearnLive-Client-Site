// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home";
// import Welcome from "./pages/Welcome";
// import CourseOutlines from "./pages/CourseOutlines";
// import VirtualClassroom from "./pages/VirtualClassroom";

// const App = () => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/welcome" element={<Welcome />} />
//           <Route path="/course-outlines" element={<CourseOutlines />} />
//           <Route path="/virtual-classroom" element={<VirtualClassroom />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Discussions from "./pages/Discussions";
import Grades from "./pages/Grades";
import People from "./pages/People";
import Pages from "./pages/Pages";
import Files from "./pages/Files";
import Syllabus from "./pages/Syllabus";
import Modules from "./pages/Modules";
import Collaborations from "./pages/Collaborations";
import Welcome from "./pages/Welcome";
import CourseOutlines from "./pages/CourseOutlines";
import VirtualClassroom from "./pages/VirtualClassroom";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/course-outlines" element={<CourseOutlines />} />
          <Route path="/virtual-classroom" element={<VirtualClassroom />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/people" element={<People />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/files" element={<Files />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/collaborations" element={<Collaborations />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;


