import React, { useState, useEffect } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import './welcome.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { clearError, verifyOtp } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';

function ForgotOtp() {
  const history = useNavigate();
  const location = useLocation();
  const customer_phone = location.state;
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const { isAuthenticated, error } = useSelector((state) => state.userReducer);

  const handleBack = () => {
    history(-1);
  };
  const [otp, setOtp] = useState("");
  const [msg,setMsg] = useState('');

 
  const handleVerify = (e) => {
    e.preventDefault();
    const sendData = { otp, phone: customer_phone };

    dispatch(verifyOtp(sendData));
    setSubmit(true);
  };
  useEffect(() => {
    if (submit && isAuthenticated) {
      history('/customer/forgot-password/reset-password', { state: customer_phone });
    }
    // eslint-disable-next-line
  }, [submit,isAuthenticated]);

  const resendOTP = () => {
    axios
      .post('/api/auth/resendOtp', { phone: customer_phone })
      .then((res) => {
        setMsg('New OTP Sent!')
        dispatch(clearError());
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
          <img src={backArrow} alt="backArrow" className='arrowbutton'  onClick={handleBack} />
        </div>
        <br />
        <div className="otp-word">
          <p>We are sending you an OTP to verify your mobile phone</p>
        </div>
        <center>
          <br />
          <p className="welcome-word2">Please Enter the Code</p>
          <br />
          <form onSubmit={handleVerify}>
          <OtpInput
            value={otp}
            onChange={(e) => setOtp(e)}
            numInputs={4}
            // placeholder="1234"
            isInputNum={true}
            separator={<span> &nbsp;&nbsp;&nbsp;&nbsp; </span>}
            containerStyle={{
              textAlign: "center",
              margin: "auto",
              justifyContent: "center",
              marginBottom: "5%",
            }}
            inputStyle={{
              width: "60px",
              height: "60px",
              fontSize: "30px",
              fontStyle: "bold",
              color: "#11337F",
              border: "2px #D0DEED solid",
              borderRadius: "8px",
              background: "#D0DEED",
            }}
            required
          />
            <div className="error-msg">{msg ? msg :error}</div>
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

export default ForgotOtp;
