import {
    createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Profile from "../components/profile";
import AllCourses from "../pages/AllCourses";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import FaceRecognition from "../pages/FaceRecognition";
import FaceRegister from "../pages/FaceRegister";
import Test from "../pages/test";
import AddCourse from "../pages/AddCourse";
import CourseDetails from "../pages/CourseDetails";
import PrivateRoute from "../providers/PrivateRoute";
import CourseContent from "../pages/CourseContent";
import AddCourseContent from "../pages/AddCourseContent";
import QuizCreatePage from "../pages/QuizCreatePage";

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
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/profile',
          element: <Profile></Profile>
        },
        {
          path:'/test',
          element: <Test/>
        },
        {
          path:'/addCourse',
          element:<PrivateRoute><AddCourse></AddCourse></PrivateRoute>
        },
        {
          path:'/courseDetails/:id',
          element:<PrivateRoute><CourseDetails></CourseDetails></PrivateRoute>
        },
        {
          path:"/courseContent/:id",
          element:<PrivateRoute><CourseContent></CourseContent></PrivateRoute>
        },
        {
          path:'/addCourseContent/:id',
          element:<PrivateRoute><AddCourseContent></AddCourseContent></PrivateRoute>
        },
        {
          path:'/createQuiz/:id',
          element:<PrivateRoute><QuizCreatePage></QuizCreatePage></PrivateRoute>
        }
      ]
    }
]);