import React, { useEffect, useState } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate } from 'react-router-dom';
import './inbox.css';
import moment from 'moment';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
  getAllInbox,
  updateInbox,
  getUnreadInbox,
} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function Inbox() {
  const history = useNavigate();
  const dispatch = useDispatch();
  var todayDate = new Date();
  const [submit, setSubmit] = useState(false);
  const { inbox, unread } = useSelector((state) => state.userReducer);
  const phone_number = localStorage.getItem('customer_phone');

  useEffect(() => {
    if (!phone_number) {
      history('/customer/welcome');
    }
    // eslint-disable-next-line
  }, [phone_number]);

  const runGet = () => {
    if (!submit) {
      dispatch(getAllInbox({ phone_number }));
      dispatch(getUnreadInbox({ phone_number }));
      setSubmit(true);
    }
  };
  useEffect(() => {
    runGet();
    // eslint-disable-next-line
  }, [phone_number]);

  const handleBack = () => {
    history('/customer/home');
  };
  const openDetail = (data) => {
    const id = data.id;
    dispatch(updateInbox({ id }));
    history('/customer/inboxdetails', { state: data });
  };
  return (
    <>
      <div className="inbox-full-bg">
        <div className="inbox-arrowback">
          <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
        </div>
        <center>
          <p className="support-text">Inbox</p>
          <div>
            <p className="inbox-unread"> {unread?.length} new messages</p>
          </div>
        </center>
      </div>
      {inbox &&
        inbox.map((msg) => (
          <List
            sx={{ width: '100%', bgcolor: 'white' }}
            onClick={() => openDetail(msg)}
          >
            <div className="inbox-details-datetime">
              {todayDate.toDateString !== msg.createdAt
                ? moment(msg.createdAt).format('YYYY/MM/DD')
                : moment(msg.createdAt).format('H:mma')}
            </div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <div className="inbox-iconRead">
                  {msg.read ? <CircleOutlinedIcon /> : <Brightness1Icon />}
                </div>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className="inbox-details-header">
                    {msg.title.substring(0, 33)} ...
                  </div>
                }
                secondary={
                  <div className="inbox-unread">
                    {msg.message.substring(0, 40) + '...'}
                  </div>
                }
              />
            </ListItem>
            <Divider />
          </List>
        ))}
    </>
  );
}

export default Inbox;
