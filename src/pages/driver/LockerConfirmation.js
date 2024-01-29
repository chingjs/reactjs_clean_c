import React, { useState } from 'react';
import Modal from 'react-modal';
import exclamation from '../../assets/images/exclamation-mark.png';
import { useNavigate, useLocation } from 'react-router-dom';
import '../modal/modal.css';
import {
    updatePickUp,
    updateDelivery,
} from '../../redux/actions/driverActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function LockerConfirmation(props) {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [errorOpen, setErrorOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const handleClose = () => {
        setOpen(false);
        history(-1, { state: location.state });
    };
    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const [errorMsg, setErrorMsg] = useState(null);
    const lockerId = location.state.lockerId
    // console.log('location', location.state)
    const goLocker = () => {
        const ctask = location.state;
        if (ctask) {
            localStorage.setItem('operator_lockerId', ctask.lockerId);
            localStorage.setItem('operator_status', ctask.status);
            const id = ctask.tid;
            const newData = {
                location: ctask.location,
                lockerId: ctask.lockerId,
            }
            if (ctask.status === 'Pick Up') {
                // dispatch(openLocker(newData));
                // dispatch(updatePickUp({ id }));
                // history('/driver/loadinglocker');
                setDisabled(true);
                axios.post('/api/locker/unlock', newData)
                    .then(res => {
                        if (res) {
                            dispatch(updatePickUp({ id }));
                            history('/driver/loadinglocker');
                        }
                    })
                    .catch(err => {
                        setErrorMsg(err.response.data.error);
                        setErrorOpen(true);
                        setDisabled(false);
                    });

            } else {
                // dispatch(openLocker(newData));
                // dispatch(updateDelivery({ id }));
                // history('/driver/loadingLocker');
                setDisabled(true);
                axios.post('/api/locker/unlock', newData)
                    .then(res => {
                        if (res) {
                            dispatch(updateDelivery({ id }));
                            history('/driver/loadinglocker');
                        }
                    })
                    .catch(err => {
                        setErrorMsg(err.response.data.error);
                        setErrorOpen(true);
                        setDisabled(false);
                    });
            }
        } else {
            setDisabled(false);
            console.log('task error');
        }

    };

    return (
        <div className="background">
            <Modal
                isOpen={open}
                onRequestClose={handleClose}
                ariaHideApp={false}
                className="confirmation-order-modal"
            >
                <br />
                <center>
                    <p className="modal-word2">
                        Please confirm to unlock Locker {lockerId}
                    </p>
                    <img src={exclamation} alt="exclamation" />
                </center>
                <br />
                <center>
                    <button
                        className="modal-confirm-button1"
                        onClick={() => goLocker()}
                        disabled={disabled}
                    >

                        Confirm
                    </button>
                    <button className="modal-confirm-button1" onClick={handleClose}>
                        Re-check
                    </button>
                </center>
            </Modal>
            <Modal
                isOpen={errorOpen}
                onRequestClose={handleErrorClose}
                ariaHideApp={false}
                className="myorder-modal-cancel"
            >
                <br />
                <div className="modal-word2">{errorMsg}</div>
                <center>
                    <img src={exclamation} alt="exclamation" />
                    <br />
                    <button className="modal-confirm-button1" onClick={handleErrorClose}>
                        Close
                    </button>
                </center>
            </Modal>
        </div>
    );
}
export default LockerConfirmation;
