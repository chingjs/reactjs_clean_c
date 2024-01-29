import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentTask,
} from '../../redux/actions/driverActions';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import './driver.css';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/DriverSidebar';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DriverHome = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const { operator, task } = useSelector((state) => state.driverReducer);
  const operatorEmail = localStorage.getItem('driver_phone');
  const operatorId = localStorage.getItem('operator_id');
  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };
  const unlockLocker = (ctask) => {
    if (ctask) {
      history('/driver/locker/confirmation', { state: ctask });
    } else {
      console.log('task error');
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!operatorEmail) {
      history('/driver/login');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (task.length === 0) {
      dispatch(getCurrentTask({ operatorId }));
    }
    // eslint-disable-next-line
  }, []);
  // console.log('task', task);

  const showCurrentTask = () => {
    return (
      task &&
      task.map((current) => (
        <div className="driver-order-border">
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <div className="driver-iconStatus">
                      {current.status === 'Pick Up' ? (
                        <>
                          <CircleOutlinedIcon />
                          <div className="driver-order-status">
                            {current.status}
                          </div>
                        </>
                      ) : (
                        <>
                          <Brightness1Icon />
                          <div className="driver-order-status">
                            {current.status}
                          </div>
                        </>
                      )}
                      <div className="driver-order-left">
                        Order ID: {current.orderId}
                      </div>
                      <div className="driver-order-location">
                        Location : {current.location}
                      </div>
                    </div>
                  </>
                }
                secondary={
                  <>
                    <div className="driver-order-right">
                      Compartment Number: {current.lockerId}
                    </div>
                  </>
                }
              />
            </ListItem>
            <center>
              <button
                className="myorder-button"
                onClick={() => unlockLocker(current)}
              >
                Unlock Locker {current.lockerId}
              </button>
            </center>
          </List>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="full-bg">
        <div className="appbar">
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon onClick={toggleDrawer(true)}></MenuIcon>
                <Drawer
                  anchor={'left'}
                  open={drawer}
                  onClose={toggleDrawer(false)}
                >
                  {Sidebar(operator)}
                </Drawer>
              </IconButton>
              <div className="driver-task-word1">Task List</div>
            </Toolbar>
          </Box>
        </div>
        <br />
        {showCurrentTask()}
        {task.length ? null : (
          <p className="driver-task-word2">Currently no task!</p>
        )}
      </div>
    </>
  );
};

export default DriverHome;
