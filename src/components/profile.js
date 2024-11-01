import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email) {
      setUserData({ name, email });
    } else {

      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem('name');
    localStorage.removeItem('email');


    navigate('/login');
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
      <div className="border-2 p-4">
        <center>
          <h2 className="font-bold text-xl underline">Profile</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <button onClick={handleLogout} className="bg-red-900 hover:bg-red-600 text-white  px-4 rounded mt-4">
            Logout
          </button>
        </center>
      </div>
    </div>
  );
};

export default Profile;
