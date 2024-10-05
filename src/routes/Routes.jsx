import {
    createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AllCourses from "../pages/AllCourses";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";

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
        }
      ]
    }
]);