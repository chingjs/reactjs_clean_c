import React from 'react';
import write from '../../assets/images/write-logo.png';
import { useNavigate } from 'react-router-dom';
import '../driver/driver.css';

function SuccessPage() {
  const history = useNavigate();
  const status = localStorage.getItem('operator_status');
  const backHome = () => {
    localStorage.removeItem('operator_lockerId');
    history('/driver/home');
  };
  return (
    <>
      <div className="driver-order-placed">
        <center>
          <img src={write} alt="write" className="middle-body" />
          <h1 className="success-order-placed">Successfully {status}!</h1>
          <br />
          <button className="btn-order-placed" onClick={() => backHome()}>
            Back to homepage
          </button>
        </center>
      </div>
    </>
  );
}

export default SuccessPage;
