import React, { useState } from 'react';
import Modal from 'react-modal';
import smartUnlock from '../../assets/images/smart-unlock.png';
import './modal.css';
import LockMessage from '../modal/LockMessage';

function UnlockMessage(props) {
  const { unlockState } = props;
  const [lockState, setLockState] = useState(false);
  const openLockerNo = localStorage.getItem('openLockerNo');
  const closeNopen = () => {
    setLockState(true);
    // setUnlockState(false);
  };
  return (
    <div className="background">
      <Modal isOpen={unlockState} className="loadinglocker-modal">
        <br />
        <center>
          <div className="modal-word1">
            <p>Locker {openLockerNo} has been unlocked.</p>
            <p> Please put your clothes in there</p>
          </div>
          <img src={smartUnlock} alt="smartunlock" />
        </center>
        <div className="px-5">
          <center>
            <button className="modal-button1" onClick={closeNopen}>
              Confirm
            </button>
          </center>
          <LockMessage lockState={lockState} setLockState={setLockState} />
        </div>
      </Modal>
    </div>
  );
}
export default UnlockMessage;
