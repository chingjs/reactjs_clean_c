import React from 'react';
import Modal from 'react-modal';
import exclamation from '../../assets/images/exclamation-mark.png';
import { useNavigate } from 'react-router-dom';
import '../modal/modal.css';

function LockMessage(props) {
  const history = useNavigate();
  const { lockState, setLockState } = props;

  const handleClose = () => {
    history('/driver/success');
    setLockState(false);
  };
  return (
    <Modal isOpen={lockState} className="modal">
      <br />
      <center>
        <p className="modal-word1">Please close the Locker Door properly</p>
        <br />
        <img src={exclamation} alt="exclamation" />
      </center>
      <div className="px-5">
        <center>
          <button className="modal-button1" onClick={handleClose}>
            Confirm
          </button>
        </center>
      </div>
    </Modal>
  );
}
export default LockMessage;
