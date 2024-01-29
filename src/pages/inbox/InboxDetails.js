import React from 'react';
import { useLocation } from 'react-router-dom';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate } from 'react-router-dom';
import './inbox.css';

function InboxDetails() {
  const history = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    history('/customer/inbox');
  };
  const forwardSupport = () => {
    history('/customer/support');
  };
  // console.log('loca', location.state)
  return (
    <>
      <div className="inbox-full-bg">
        <div className="inbox-arrowback">
          <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
        </div>
        <center>
          <p className="support-text">Inbox</p>
        </center>
      </div>
      <div className="inboxdetails-header">{location.state.title}</div>
      <div className="inboxdetails">
        <p>Hi,</p>
        <p> {location.state.message}</p>
      </div>
      <div>
        <center>
          <button className="inboxdetails-support" onClick={forwardSupport}>
            Contact Mr.Clean
          </button>
        </center>
      </div>
    </>
  );
}

export default InboxDetails;
