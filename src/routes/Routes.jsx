import {
    createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Profile from "../components/profile";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>
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
    }
]);