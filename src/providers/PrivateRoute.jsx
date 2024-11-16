import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location =useLocation();
    if(loading){
        return <div className="h-[60%] w-screen flex justify-center items-center">
            {/* <span className="loading loading-dots loading-lg"></span> */}
            <span className="text-3xl">Loading...</span>
        </div>
    }
    if(user){
        return children;
    }
    
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;