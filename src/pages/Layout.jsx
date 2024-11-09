import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";


const Layout = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;