// import React from "react";

// const Home = () => {
//   return (
//     <div className="flex-1 bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4">Learn live </h1>
//       <div className="bg-white shadow rounded p-4">
//         <h2 className="text-xl font-semibold mb-2">Welcome Module</h2>
//         <ul>
//           <li className="py-2 border-b">
//             <a href="#welcome" className="text-blue-500">Welcome</a>
//           </li>
//           <li className="py-2 border-b">
//             <a href="#course-outlines" className="text-blue-500">Course outlines</a>
//           </li>
//           <li className="py-2">
//             <a href="#virtual-classroom" className="text-blue-500">Virtual Classroom Link</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-1 bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Learn Live</h1>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Welcome Module</h2>
        <ul>
          <li className="py-2 border-b">
            <Link to="welcome" className="text-blue-500">Welcome</Link>
          </li>
          <li className="py-2">
            <Link to="classRoom" className="text-blue-500">Virtual Classroom Link</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;


