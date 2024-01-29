import React, { useState, useRef, useEffect } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import './welcome.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { verifyOtp, clearError } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function ResendOtp() {
  const history = useNavigate();
  const location = useLocation();
  const customer_phone = location.state;
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const { isAuthenticated, error } = useSelector((state) => state.userReducer);

  const handleBack = () => {
    history('/customer/welcome');
  };
  const initialValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  };
  const [data, setData] = useState(initialValues);
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleVerify = (e) => {
    e.preventDefault();
    const newData = data.code1.concat(data.code2, data.code3, data.code4);
    const sendData = { otp: newData, phone: customer_phone };

    dispatch(verifyOtp(sendData));
    setSubmit(true);
  };

  useEffect(() => {
    if (submit && isAuthenticated) {
      history('/home', { state: customer_phone });
    }
    // eslint-disable-next-line
  }, []);

  const resendOTP = () => {
    axios
      .post('/api/auth/resendOtp', { phone: customer_phone })
      .then((res) => {
        setData({
          code1: '',
          code2: '',
          code3: '',
          code4: '',
        });
        dispatch(clearError());
        history('/customer/resendotp', { state: customer_phone });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  return (
    <>
      <div>
        <br />
        <br />
        <div className="signin-arrowback">
          <img src={backArrow} alt="backArrow" onClick={handleBack} />
        </div>
        <br />
        <div className="otp-word">
          <p>We are sending you new OTP to verify your mobile phone</p>
        </div>
        <center>
          <br />
          <p className="welcome-word2">Please Enter the Code</p>
          <br />
          <form onSubmit={handleVerify}>
            <div>
              <input
                type="text"
                name="code1"
                value={data.code1}
                ref={pin1Ref}
                onChange={(pin1) => {
                  handleChange(pin1);
                  if (pin1 !== null) {
                    pin2Ref.current.focus();
                  }
                }}
                maxLength={1}
                className="unlock-locker-code-box"
              />{' '}
              {'  '}
              <input
                type="text"
                name="code2"
                value={data.code2}
                ref={pin2Ref}
                onChange={(pin2) => {
                  handleChange(pin2);
                  if (pin2 !== null) {
                    pin3Ref.current.focus();
                  }
                }}
                maxLength={1}
                className="unlock-locker-code-box"
              />{' '}
              {'  '}
              <input
                type="text"
                name="code3"
                value={data.code3}
                ref={pin3Ref}
                onChange={(pin3) => {
                  handleChange(pin3);
                  if (pin3 !== null) {
                    pin4Ref.current.focus();
                  }
                }}
                maxLength={1}
                className="unlock-locker-code-box"
              />{' '}
              {'  '}
              <input
                type="text"
                name="code4"
                value={data.code4}
                ref={pin4Ref}
                onChange={handleChange}
                maxLength={1}
                className="unlock-locker-code-box"
              />
            </div>
            <div className="error-msg">{error}</div>
            <br />
            <div>
              <p className="didnt-not-received-code">
                I didn't receive a code!
              </p>
              <a href className="resend-code" onClick={resendOTP}>
                Resend Code
              </a>
            </div>
            <br />
            <br />
            <div>
              <button type="submit" className="welcome-button1">
                Verify
              </button>
            </div>
          </form>
        </center>
      </div>
    </>
  );
}

export default ResendOtp;
