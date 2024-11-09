import {
    createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AllCourses from "../pages/AllCourses";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import FaceRecognition from "../pages/FaceRecognition";
import FaceRegister from "../pages/FaceRegister";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout></Layout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<HomePage></HomePage>
        },
        {
          path: "/allCourses",
          element: <AllCourses></AllCourses>
        },
        {
          path: "/face",
          element:<FaceRecognition></FaceRecognition>
        },
        {
          path:"/register",
          element:<FaceRegister></FaceRegister>
        }
      ]
    }
]);