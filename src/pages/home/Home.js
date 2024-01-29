import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import logo from '../../assets/welcome/signin-logocat.png';
import FB from '../../assets/welcome/fb.png';
import washMachine from '../../assets/images/home-icon1.png';
import smartUnlock from '../../assets/images/home-icon2.png';
import './home.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { getProfile } from '../../redux/actions/userActions';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, locationList } = useSelector((state) => state.userReducer);
  const [drawer, setDrawer] = useState(false);
  const username = user?.full_name ? user?.full_name : 'New User';
  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };
  const phone = localStorage.getItem('customer_phone');
  const lockerId = localStorage.getItem('lockerId')
  useEffect(() => {
    window.scrollTo(0, 0);
    if (phone) {
      dispatch(getProfile({ phone_number: phone }));
    } else {
      history('/customer/login');
    }
    // eslint-disable-next-line
  }, [phone]);

  const goFB = () => {
    window.location.href = 'http://m.me/mrjslaundrette'
  }
  // console.log('locationlist', locationList)
  const checkLocker = () => {
    if (lockerId) {
      const filterData = locationList.filter((j) => j.id === lockerId)[0];
      // console.log('data', filterData)
      if (filterData) {
        history('/customer/home2', { state: { lockerId: filterData.id, location: filterData.location, strategy: filterData.strategy, name: filterData.name } })
      }
      else {
        history('/customer/location')
      }
    } else {
      history('/customer/location')
    }
  }
  return (
    <>
      <div className="appbar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: 'white' }}>
            <Toolbar>
              <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon onClick={toggleDrawer(true)}></MenuIcon>
                <Drawer
                  anchor={'left'}
                  open={drawer}
                  onClose={toggleDrawer(false)}
                >
                  {Sidebar(user)}
                </Drawer>
              </IconButton>
              <div className="notification-top-right">
                <IconButton aria-label="menu" sx={{ mr: 2 }}>
                  <NotificationsNoneIcon
                    onClick={() => history("/customer/inbox")}
                  />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <br />
      <div className="home-word1">
        <div className="welcome-logo">
          <img src={logo} alt="logo" className="responsive" />
         </div>
        <br />
        <p>Welcome, {username}</p>
      </div>
      <br />
      <img src={FB} alt='fb' className="fb-icon" onClick={() => goFB()}></img>
      <center>
        <div className="button-container" >
          <button className="home-button" onClick={() => checkLocker()}>
            <img
              src={washMachine}
              alt="home-icon"
              className="home-icon"

            ></img>
            <p className="home-word1">Clean</p>
          </button>
          <button className="home-button" onClick={() => history('/customer/myorder')}>
            <img
              className="home-icon"
              src={smartUnlock}
              alt="icon2"

            />
            <p className="home-word1">Collect</p>
          </button>
        </div>
      </center>
    </>
  );
};

export default Home;
