import React from 'react';
import Modal from 'react-modal';
import {  useNavigate } from 'react-router-dom';
import smartUnlock from '../../assets/images/smart-unlock.png';
import './modal.css';

function CollectMessage(props) {
    const { unlockState } = props;
    const navigate = useNavigate();
    const openLockerNo = localStorage.getItem('openLockerNo');
    const closeNopen = () => {
        navigate('/customer/order-completed')
        // setUnlockState(false);
    };
    return (
        <div className="background">
            <Modal isOpen={unlockState} className="loadinglocker-modal">
                <br />
                <center>
                    <div className="modal-word1">
                        <p>Locker {openLockerNo} has been unlocked.</p>
                        <p> Please collect your clothes in there</p>
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
export default CollectMessage;
