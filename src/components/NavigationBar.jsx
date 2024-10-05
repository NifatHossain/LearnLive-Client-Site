import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <div className='font-semibold text-xl'><span className="text-red-500">Learn</span> Live</div>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
                >
                <Dropdown.Header>
                    <span className="block text-sm">Nifat</span>
                    <span className="block truncate text-sm font-medium">nifatgmail.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to={'/'} active>
                Home
                </Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Link to={'/allCourses'}>Courses</Link>
                {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;