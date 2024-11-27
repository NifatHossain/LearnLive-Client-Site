import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const NavigationBar = () => {
    const {user,logOut}=useContext(AuthContext)
    // console.log(user.userName)
    const handleLogOut=()=>{
        logOut()
        .then(()=>{
            toast.success('Log out Successful')
        })
        .catch((error)=>{
            toast.error('LogOut Failed')
            console.log(error.message)
        })
    }
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <div className='font-semibold text-xl'><span className="text-red-500">Learn</span> Live</div>
            </Navbar.Brand>{
            user ? <div className="flex md:order-2">
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img={user.photoURL} rounded />
                }
                >
                <Dropdown.Header>
                    <span className="block text-sm">{user.displayName}</span>
                    <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item><Link to={'/sideBar'}>Dashboard</Link></Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><button onClick={handleLogOut}>Sign out</button></Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>:
            <div className="flex md:order-2">
                <Link to={'/login'}><button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign In</button></Link>
            </div>
            }
            <Navbar.Collapse>
                <Link to={'/'} active>
                Home
                </Link>
                <Link to={'/sideBar'}>Dashboard</Link>
                <Link to={'/allCourses'}>Courses</Link>
                {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
            <Toaster></Toaster>
        </Navbar>
    );
};

export default NavigationBar;