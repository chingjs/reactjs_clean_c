import './Support.css';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import backArrow from '../../assets/images/back-arrow.png';
import { sendSupport } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

function Support() {
  const history = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    history('/customer/home');
  };
  const dispatch = useDispatch();
  const [success, setSuccess] = useState('');
  const [data, setData] = useState({
    orderId: '',
    message: '',
    phone_number: localStorage.getItem('customer_phone'),
  });
  useEffect(() => {
    if (location.state) {
      const oid = location.state.id;
      if (!data.orderId && oid) {
        setData({ orderId: oid });
      }
    } // eslint-disable-next-line
  }, [location.state]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!success) {
      dispatch(sendSupport(data));
      setSuccess(
        <div className="support-success-msg">Success sent to Mr Clean! </div>
      );
    }
  };
  return (
    <>
      <div className="support-body">
        <div className="support-arrow">
          <img
            src={backArrow}
            alt="backArrow"
            className="arrowbutton"
            onClick={handleBack}
          />
        </div>
        <center>
          <p className="support-text">Support</p>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="profile-detail">
            <p className="support-word1">Order ID</p>
            <TextField
              fullWidth
              value={data.orderId}
              onChange={(e) => setData({ ...data, orderId: e.target.value })}
              label="Order ID"
              placeholder="Enter the Order ID"
            />

            {/* <p className="support-word1">Subject</p>
            <TextField fullWidth required value={data.subject}
              onChange={(e) => setData({ ...data, subject: e.target.value })} label='Subject' placeholder="Enter the Subject" /> */}
            <div style={{ marginTop: '5%' }} />
            <p className="support-word1">Message</p>
            <TextField
              fullWidth
              required
              value={data.message}
              multiline
              rows={9}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              label="Message"
              placeholder="Enter the Subject"
            />
          </div>
          <div style={{ marginTop: '15%' }} />
          <center>
            {success}
            <button className="support-button1" type="submit">
              Submit
            </button>
          </center>
        </form>
      </div>
    </>
  );
}

export default Support;
