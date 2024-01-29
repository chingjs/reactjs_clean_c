import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import home from '../../assets/Sidebar/nav-home.png';
import inbox from '../../assets/Sidebar/nav-inbox.png';
import order from '../../assets/Sidebar/nav-order.png';
import profile from '../../assets/Sidebar/nav-profile.png';
import support from '../../assets/Sidebar/nav-support.png';
import logout from '../../assets/Sidebar/nav-logout.png';
import userProfile from '../../assets/Sidebar/nav-user.png';
import { logoutUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const Sidebar = (user) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    localStorage.removeItem('customer_phone');
    localStorage.removeItem('customer_id');
    dispatch(logoutUser());
    navigate('/customer/welcome');
  };

  return (
    <div className="sidebar">
      <br />
      <center>
        <div className="sidebar-top">
          <img
            src={user?.photo_url ? user?.photo_url : userProfile}
            style={{
              width: '100px',
              height: '100px',
              margin: '30px',
              borderRadius: '100px',
            }}
            alt="user"
          />
          <p className="sidebar-word1">
            {user?.full_name ? user?.full_name : 'New User'}
          </p>
        </div>
      </center>
      <div className="sidebar-body">
        <p onClick={() => navigate('/customer/home')}>
          <img src={home} className="sidebar-icon" alt="home" /> Home{' '}
        </p>
        <p onClick={() => navigate('/customer/inbox')}>
          <img src={inbox} className="sidebar-icon" alt="inbox" /> Inbox{' '}
        </p>
        <p onClick={() => navigate('/customer/myprofile')}>
          <img src={profile} className="sidebar-icon" alt="profile" /> Profile{' '}
        </p>
        <p onClick={() => navigate('/customer/myorder')}>
          <img src={order} className="sidebar-icon" alt="order" /> Order{' '}
        </p>
        <p onClick={() => navigate('/customer/support')}>
          <img src={support} className="sidebar-icon" alt="support" /> Support{' '}
        </p>
      </div>

      <p className="sidebar-bottom" onClick={() => userLogout()}>
        <img src={logout} className="sidebar-icon" alt="logout" /> Logout{' '}
      </p>
    </div>
  );
};

export default Sidebar;
