import React from 'react';
import Modal from 'react-modal';
import smartUnlock from '../../assets/images/smart-unlock.png';
import '../modal/modal.css';
import { useNavigate } from 'react-router-dom';

function UnlockMessage(props) {
  const { unlockState, lockerId, goSuccess } = props;
  const history = useNavigate;

  if (!lockerId) {
    history('/driver/home');
  }
  const closeNopen = () => {
    localStorage.removeItem('operator_lockerId');
    goSuccess();
  };
  return (
    <div className="background">
      <Modal isOpen={unlockState} className="driver-unlock-modal">
        <br />
        <center>
          <div className="unlock-modal-word1">
            <h2>Locker {lockerId} </h2>
            <p>has been unlocked.</p>
          </div>
          <img src={smartUnlock} alt="smartunlock" />
        </center>
        <div className="px-5">
          <center>
            <button className="modal-button1" onClick={closeNopen}>
              Confirm
            </button>
          </center>
        </div>
      </Modal>
    </div>
  );
}
export default UnlockMessage;
