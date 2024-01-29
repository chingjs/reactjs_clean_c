import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

import home from '../../assets/Sidebar/nav-home.png';
import records from '../../assets/Sidebar/nav-folder.png';
import logout from '../../assets/Sidebar/nav-logout.png';
import userProfile from '../../assets/Sidebar/nav-user.png';

const DriverSidebar = (operator) => {
  const navigate = useNavigate();
  const userLogout = () => {
    localStorage.removeItem('customer_phone');
    navigate('/driver/welcome');
  };

  // useEffect(() => {
  //   const phone = localStorage.getItem('customer_phone');
  //   if (!phone) {
  //     navigate('/welcome');
  //   }
  // });

  return (
    <div className="sidebar">
      <br />
      <center>
        <div className="sidebar-top">
          <img
            src={operator?.photo_url ? operator?.photo_url : userProfile}
            className="user-logo"
            alt="user"
            onClick={() => navigate('/driver/home')}
          />
          <br/>
          <br/>
          <p className="sidebar-word1">
            {operator?.full_name ? operator?.full_name : 'Operator'}
          </p>
        </div>
      </center>
      <div className="sidebar-body">
        <p onClick={() => navigate('/driver/home')}>
          <img src={home} className="sidebar-icon" alt="home" /> Home
        </p>
        <p onClick={() => navigate('/driver/record')}>
          <img src={records} className="sidebar-icon" alt="inbox" /> Records
        </p>
        {/* <p onClick={() => navigate("/myprofile")}><img src={profile} className='sidebar-icon' alt="profile" /> Profile </p>
                <p onClick={() => navigate("/myorder")}><img src={order} className='sidebar-icon' alt="order" /> Order </p>
                <p onClick={() => navigate("/support")}><img src={support} className='sidebar-icon' alt="support" /> Support </p> */}
      </div>

      <p className="driver-sidebar-bottom" onClick={() => userLogout()}>
        <img src={logout} className="sidebar-icon" alt="logout" /> Logout{' '}
      </p>
    </div>
  );
};

export default DriverSidebar;
