import React from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import unlock from '../../assets/images/modal-unlock.png';
import { useNavigate, useLocation } from 'react-router-dom';
import './modal.css';

function UnlockOTP() {
  const history = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    history(-1);
  };
  const lockerNo = location.state.collectLockerId;
  return (
    <>
      <img
        src={backArrow}
        alt="backArrow"
        className="modal-arrowback"
        onClick={handleBack}
      />
      <div className="unlock-logo">
        <center>
          <img src={unlock} alt="unlock" />
        </center>
      </div>
      <div className="otp-word">
        <p>We have sent you an OTP to unlock the locker</p>
      </div>
      <center>
        <br />
        <p className="welcome-word2">Please Enter the Code</p>
        <br />
        <div>
          <input type="number" className="unlock-locker-code-box" /> {'  '}
          <input type="number" className="unlock-locker-code-box" /> {'  '}
          <input type="number" className="unlock-locker-code-box" /> {'  '}
          <input type="number" className="unlock-locker-code-box" />
        </div>
        <br />
        <div>
          <p className="didnt-not-received-code">I didn't receive a code!</p>
          <a className="resend-code" href="/resendOtp">
            Resend Code
          </a>
        </div>
        <br />
        <br />
        <div>
          <button
            onClick={() => {
              history('/customer/success-unlock', { state: location.state });
            }}
            className="unlock-button1"
          >
            Unlock Locker {lockerNo}
          </button>
        </div>
      </center>
    </>
  );
}

export default UnlockOTP;
