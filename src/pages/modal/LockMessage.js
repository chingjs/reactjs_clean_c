import React, { useEffect } from 'react';
import Modal from 'react-modal';
import exclamation from "../../assets/images/exclamation-mark.png";
import { useNavigate } from "react-router-dom";
import './modal.css'
import { clearError, getOneLocker } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function LockMessage(props) {
    const history = useNavigate();
    const {  lockState, setLockState } = props;
    const dispatch = useDispatch();
    const LockerNo = localStorage.getItem('openLockerNo');
    const { oneLocker, error } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (oneLocker) {
            dispatch(clearError());
        }        // eslint-disable-next-line
    }, [])

    const handleClose = () => {
        console.log("lockerNo", oneLocker, error)
        dispatch(clearError());
        const sendData = {
            LockerNo,
            location: localStorage.getItem('location')
        }
        console.log("lockerNo", sendData)
        dispatch(getOneLocker(sendData));

        if (oneLocker) {
            console.log("openLocker", oneLocker)
            setLockState(false);
            history("/customer/order-placed");
        } else {
            console.log("locker still open", error)
        }
    }
    return (
        <Modal
            isOpen={lockState}
            className='loadinglocker-modal'
        >
            <br />
            <center>
                <p className="modal-word1">
                    Please close the Locker Door properly
                </p>
                <br />
                <img src={exclamation} alt="exclamation" />
            </center>
            <div className="px-5">
                <center>
                    <button
                        className="modal-button1"
                        onClick={handleClose}
                    >
                        Confirm
                    </button>
                    <div className='modal-error'>{error}</div>
                    <br />
                </center>
            </div>
        </Modal >
    )
}
export default LockMessage;