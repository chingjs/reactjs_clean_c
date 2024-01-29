import React from 'react';
import welcome from '../../assets/driver/driver-welcome.png';
import './driver.css';
import { useNavigate } from 'react-router-dom';

function DriverWelcome() {
  const history = useNavigate();

  return (
    <>
      <br />
      <br />
      <center>
        <div className="height">
          <div className="driver-welcome-word1">
            <p>Laundry Driver</p>
          </div>
          <div className="driver-welcome-word2">
            <p>Deliver the perfect care for customer clothes so that </p>
            <p>they can enjoy our laundry services</p>
          </div>
          <br />
          <img src={welcome} alt="welcome" className="driver-responsive" />
          <div className="driver-welcome-logo">
            <button
              className="welcome-button1"
              onClick={() => {
                history('/driver/login');
              }}
            >
              Sign In
            </button>
            <div className="driver-welcome-word3">
              <p>No account yet? Contact us at mrclean.com.my to register.</p>
            </div>
            {/* <button
              className='welcome-button2'
              onClick={() => { history("/register"); }}>
              Create account
            </button> */}
          </div>
        </div>
      </center>
    </>
  );
}

export default DriverWelcome;
