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
import QuizPage from "../pages/QuizPage";
import TestQuizPage from "../pages/TestQuizPage";
import Sidebar from "../adison/Sidebar";
import Home from "../adison/Home";
import Files from "../adison/Files";
import Collaborations from "../adison/Collaborations";
import Discussions from "../adison/Discussions";
import Grades from "../adison/Grades";
import Modules from "../adison/Modules";
import People from "../adison/People";
import Syllabus from "../adison/Syllabus";
import VirtualClassroom from "../adison/VirtualClassroom";
import Welcome from "../adison/Welcome";
import Pages from "../adison/Pages";

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
        },
        {
          path:'/quiz/:courseId/:quizName',
          element:<TestQuizPage></TestQuizPage>
        },
        {
          path:'/quizTest/:courseId/:quizName',
          element:<QuizPage></QuizPage>
        },
        
      ]
    },
    {
      path: '/sideBar',
      element: <PrivateRoute><Sidebar></Sidebar></PrivateRoute>,
      children:[
        {
          path: '/sideBar',
          element:<Home></Home>
        },
        {
          path:'/sideBar/files',
          element:<Files></Files>
        },
        {
          path:'/sideBar/collaborations',
          element:<Collaborations></Collaborations>
        },
        {
          path:'/sideBar/discussions',
          element:<Discussions></Discussions>
        },
        {
          path:'/sideBar/grades',
          element:<Grades></Grades>
        },
        {
          path:'/sideBar/modules',
          element:<Modules/>
        },
        {
          path:'/sideBar/people',
          element:<People></People>
        },
        {
          path:'/sideBar/syllabus',
          element:<Syllabus></Syllabus>
        },
        {
          path:'/sideBar/classRoom',
          element:<VirtualClassroom></VirtualClassroom>
        },
        {
          path:'/sideBar/welcome',
          element:<Welcome></Welcome>
        },
        {
          path:'/sideBar/pages',
          element:<Pages></Pages>
        }
        
      ]
    }
]);