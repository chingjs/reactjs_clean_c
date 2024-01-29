import React, { useEffect } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPastTask } from '../../redux/actions/driverActions';
import './driver.css';
import CircleIcon from '@mui/icons-material/Circle';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DriverRecords = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { pastTask } = useSelector((state) => state.driverReducer);
  const operatorEmail = localStorage.getItem('driver_phone');
  const operatorId = localStorage.getItem('operator_id');
  const handleBack = () => {
    history('/driver/home');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!operatorEmail) {
      history('/driver/login');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    if (!pastTask) {
      dispatch(getPastTask({ operatorId }));
    }
    // eslint-disable-next-line
  }, [pastTask]);

  const showPastTask = () => {
    return (
      pastTask &&
      pastTask.map((past) => (
        <div className="driver-order-border">
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <div className="driver-completed-iconStatus">
                      {past.status === 'Pick Up' ? (
                        <>
                          <CircleIcon />
                          <div className="driver-order-status">
                            Pick Up Completed
                          </div>
                        </>
                      ) : (
                        <>
                          <CircleIcon />
                          <div className="driver-order-status">
                            Drop Off Completed
                          </div>
                        </>
                      )}
                      <div className="driver-order-left">
                        Order ID: {past.orderId}
                      </div>
                      <div className="driver-order-location">
                        Location : {past.location}
                      </div>
                    </div>
                  </>
                }
                secondary={
                  <>
                    <div className="driver-order-right">
                      Compartment Number: {past.lockerId}
                    </div>
                  </>
                }
              />
            </ListItem>
          </List>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="full-bg">
        <div className="driver-arrowback">
          <img src={backArrow} className="driver-arrowimg" alt="backArrow" onClick={handleBack} />
        </div>
        <div className="driver-record-word1">Records</div>
        <br />
        {showPastTask()}
        {pastTask && pastTask.length ? null : (
          <p className="driver-task-word2">No Record yet!</p>
        )}
      </div>
    </>
  );
};

export default DriverRecords;
