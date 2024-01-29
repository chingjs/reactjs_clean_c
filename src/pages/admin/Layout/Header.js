import SideBar from './SideBar';
import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import headerBackground from '../../../assets/admin/backgroundpic.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../../redux/actions/adminActions';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { admin } = useSelector((state) => state.adminReducer);

  const changeDrawerState = () => {
    setOpenDrawer(!openDrawer);
  };
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, [])
  return (
    <div>
      <AppBar
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: '100%',
          width: '100%',
          position: 'fixed',
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon />
          </IconButton>
          <Typography
            style={{
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: 'bold',
              color: 'black',
              padding: '15px 20px',
            }}
          >
            SMART LOCKER
          </Typography>
          <div style={{ marginLeft: '82%', color: 'black', fontWeight: 'bold' }}>{admin && admin.name.toUpperCase()}</div>
        </Toolbar>
      </AppBar>
      {openDrawer && (
        <SideBar
          openDrawer={openDrawer}
          changeDrawerState={changeDrawerState}
        />
      )}
    </div>
  );
}

export default Header;
