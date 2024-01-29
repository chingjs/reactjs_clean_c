import React from "react";
import write from "../../assets/images/write-logo.png";
import remove from "../../assets/images/remove.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../order/order.css";

function SuccessUnlock() {
  const history = useNavigate();
  const location = useLocation();
  const lockerNo = location.state.collectLockerId;
  const handleClose = () => {
    history("/customer/home");
  }

  return (
    <>
      <div className="body-order-placed">
        <div className="top-right-remove">
          <img src={remove} alt='remove' className="remove-adjust" onClick={handleClose} />
        </div>
        <div>
          <center >
            <div className="middle-body">
              <img src={write} alt='write' />
              <h1 className="success-unlock-msg">Success! Locker {lockerNo} Unlocked!</h1>
              <div className="order-placed-msg">
                <p>Please confirm that you have collected your laundry and closed the door properly.</p>
              </div>
              <br />
              <button
                className="btn-order-placed"
                onClick={() => {
                  history("/customer/home");
                }}
              >
                Confirm
              </button>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default SuccessUnlock;
