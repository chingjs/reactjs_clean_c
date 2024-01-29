import './order.css';

import React, { useEffect, useState } from 'react';
import {
  cancelOrder,
  completeOrder,
  depositItem,
  getCollectOrder,
  getCurrentOrder,
  getDepositOrder,
  getPastOrder,
  getPaymentOrder,
  getRepayment,
  updateReserved,
} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from 'react-modal';
import arrow from '../../assets/order/myorder-arrow.png';
import axios from 'axios';
import backArrow from '../../assets/images/back-arrow.png';
import exclamation from '../../assets/images/exclamation-mark.png';
import io from 'socket.io-client';
import moment from 'moment';
import noArrow from '../../assets/order/myorder-noarrow.png';
import rightArrow from '../../assets/order/order-rightArrow.png';
import { useNavigate } from 'react-router-dom';

function Myorder() {
  const dispatch = useDispatch();
  const [past, setPast] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [lockerData, setLockerData] = useState('');
  const [deleteLocation, setDeleteLocation] = useState('');
  const [submit, setSubmit] = useState(false);
  const [current, setCurrent] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [unlockData, setUnlockData] = useState();

  const history = useNavigate();
  const handleBack = () => {
    history('/customer/home');
  };
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const {
    pastOrder,
    currentOrder,
    collectOrder,
    paymentOrder,
    depositOrder,
  } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const phone = localStorage.getItem('customer_phone');
    if (!phone) {
      history('/customer/home');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const custId = { customerId: localStorage.getItem('customer_id') };
    if (custId) {
      dispatch(getPastOrder(custId));
      dispatch(getCurrentOrder(custId));
      dispatch(getCollectOrder(custId));
      dispatch(getPaymentOrder(custId));
      dispatch(getDepositOrder(custId));
    } else {
      history('/customer/home');
    }
    // eslint-disable-next-line
  }, []);

  const { url } = useSelector((state) => state.userReducer);
  const makePayment = (e) => {
    const sendData = {
      phone_number: localStorage.getItem('customer_phone'),
      price: e.price,
      additionalData: e.orderId,
      orderId: e.orderId,
    };
    dispatch(getRepayment(sendData));
    setSubmit(true);
  };
  const deleteOrder = () => {
    const sendLocker = {
      location: deleteLocation,
      lockerNo: lockerData,
      status: 'false',
    };
    dispatch(updateReserved(sendLocker));
    dispatch(cancelOrder({ id: orderId }));
    update();
    setSubmit(true);
    setOpen(false);
  };

  const update = () => {
    const custId = { customerId: localStorage.getItem('customer_id') };
    if (custId) {
      dispatch(getPastOrder(custId));
      dispatch(getCurrentOrder(custId));
      dispatch(getCollectOrder(custId));
      dispatch(getPaymentOrder(custId));
      dispatch(getDepositOrder(custId));
    }
  };

  const goDepositItem = (e) => {
    const sendData = {
      orderId: e.orderId,
    };
    // dispatch(depositItem(sendData));
    unlockLocker(e, sendData);
    setDisabled(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (url && submit) {
      window.location.href = url;
    }
  }, [url, submit]);

  const unlockLocker = (data, sendData) => {
    console.log('unlock data', data);
    console.log('unlock sendData', sendData);
    const newData = {
      orderId: data.orderId,
      location: data.location,
      lockerId: data.lockerId,
      type: 'deposit',
    };
    setUnlockData(newData);

    axios
      .post('/api/locker/unlock', newData)
      .then((res) => {})
      .catch((err) => {
        setErrorMsg(err.response.data.error);
        setErrorOpen(true);
        setDisabled(false);
      });
  };

  useEffect(() => {
    let passData = unlockData;
    console.log('unlockccc', unlockData)
    const socket = io({ auth: { roomId: 'customer' } });
    const handleUnlockSuccess = (data) => {
      console.log('socket unlock-success', data);
      if (passData) {
        console.log('passsss', passData);
        dispatch(depositItem(passData));

        localStorage.setItem('openLockerNo', data.name);
        history('/customer/loadinglocker', { state: passData });
      }
    };

    socket.on('unlock-success', handleUnlockSuccess);

    return () => {
      socket.off('left');
    };
    // eslint-disable-next-line
  }, [unlockData]);

  const unlockCollectLocker = (data) => {
    console.log('data', data);
    const id = data.orderId;
    const newData2 = {
      location: data.location,
      lockerId: data.collectLockerId,
    };
    console.log('', data);
    // dispatch(openLocker(newData2));
    axios
      .post('/api/locker/unlock', newData2)
      .then((res) => {
        if (res) {
          dispatch(completeOrder({ id, location: data.location }));
          localStorage.setItem('openLockerNo', data.collectLockerId);
          history('/customer/loadinglocker', { state: { type: 'collect' } });
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.error);
        setErrorOpen(true);
      });
  };

  const showPastOrder = () => {
    return (
      pastOrder &&
      pastOrder.map((detail, idx) => (
        <div className="myorder-border" key={idx}>
          <List
            onClick={() =>
              history('/customer/order-details/update', { state: detail })
            }
          >
            <ListItem>
              <ListItemText
                primary={
                  <div className="myorder-details-header">
                    {detail.serviceType}
                  </div>
                }
                secondary={
                  <div className="myorder-unread">
                    {moment(new Date(detail.createdAt)).format('YYYY/MM/DD')}
                  </div>
                }
              />
              <ListItemText
                primary={
                  <div className="myorder-details">
                    RM
                    {parseFloat(
                      detail.price -
                        detail.orderDetailAmount -
                        detail.discountAmount
                    ).toFixed(2)}
                  </div>
                }
                secondary={
                  <div className="myorder-details">
                    Total {detail.quantity - detail.orderDetailQuantity} Items
                  </div>
                }
              />
              <img src={rightArrow} alt="" />
            </ListItem>
          </List>
        </div>
      ))
    );
  };
  const showCurrentOrder = () => {
    // console.log(currentOrder);
    return (
      currentOrder &&
      currentOrder.map((current, idx) => (
        <div className="myorder-border" key={idx}>
          <List
            onClick={() =>
              history('/customer/order-details/update', { state: current })
            }
          >
            <ListItem>
              <ListItemText
                primary={
                  <div className="myorder-details-header">
                    Service : {current.serviceType}
                  </div>
                }
                secondary={
                  <div className="myorder-status">
                    {current.pickup_time === null ? 'In Locker ' : 'Processing'}
                  </div>
                }
              />
              <ListItemText
                primary={
                  <div className="myorder-details">
                    RM{(current.price - current.discountAmount).toFixed(2)}
                  </div>
                }
                secondary={
                  <div className="myorder-details">
                    Total {current.quantity} Items
                  </div>
                }
              />
              <img src={rightArrow} alt="" />
            </ListItem>
          </List>
        </div>
      ))
    );
  };

  const showCollectOrder = () => {
    // console.log(collectOrder);
    return (
      collectOrder &&
      collectOrder.map((current, idx) => (
        <div className="myorder-border" key={idx}>
          <List
          // onClick={() => history('/customer/order-details/update', { state: current })}
          >
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <div className="myorder-details-header">
                      {current.serviceType}
                    </div>
                    <div className="myorder-orderId">
                      {' '}
                      Order ID: {current.orderId}
                    </div>
                  </>
                }
                secondary={
                  <button
                    className="myorder-button"
                    onClick={() => unlockCollectLocker(current)}
                  >
                    Collect Now - {current.collectLockerId}
                  </button>
                }
              />
            </ListItem>
          </List>
        </div>
      ))
    );
  };

  const openModal = (d) => {
    // console.log('data delete', d)
    setDeleteLocation(d.location);
    setLockerData(d.lockerId);
    setOrderId(d.orderId);
    setOpen(true);
  };

  const showPaymentOrder = () => {
    // console.log(paymentOrder);
    return (
      paymentOrder &&
      paymentOrder.map((current, idx) => (
        <div className="myorder-border" key={idx}>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <div className="myorder-details-header">
                      Service Type : {current.serviceType}
                      {/* <button
                        className="myorder-cancel-button"
                        disabled={disabled}
                        onClick={() => openModal(current.orderId)}
                      >
                        Cancel Order
                      </button> */}
                      <div className="myorder-cancel-button">
                        {current.deposit_time ? (
                          ''
                        ) : (
                          <CancelPresentationIcon
                            onClick={() => openModal(current)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="myorder-orderId">
                      Order ID: {current.orderId}
                      <div style={{ marginLeft: '1px' }}>
                        {' '}
                        Date :{' '}
                        {moment(new Date(current.createdAt)).format(
                          'YYYY/MM/DD'
                        )}
                      </div>
                    </div>
                  </>
                }
                secondary={
                  <div className="myorder-pay-container">
                    <button
                      className="myorder-pay-button"
                      disabled={disabled}
                      onClick={() => makePayment(current)}
                    >
                      Payment Now{' '}
                      {'- [ RM ' + (current.price / 100).toFixed(2) + ' ]'}
                    </button>
                  </div>
                }
              />
            </ListItem>
          </List>
        </div>
      ))
    );
  };

  const showDepositOrder = () => {
    // console.log(depositOrder)
    return (
      depositOrder &&
      depositOrder.map((current, idx) => (
        <div className="myorder-border" key={idx}>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <div className="myorder-details-header">
                      Service Type : {current.serviceType}
                    </div>
                    <div className="myorder-orderId">
                      {' '}
                      Order ID: {current.orderId}
                    </div>
                  </>
                }
                secondary={
                  <button
                    className="myorder-button"
                    onClick={() => goDepositItem(current)}
                    disabled={disabled}
                  >
                    Unlock Locker {current.lockerId}
                  </button>
                }
              />
            </ListItem>
          </List>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="myorder-top-bg">
        <div className="order-arrowback">
          <img
            src={backArrow}
            alt="backArrow"
            className="arrowbutton"
            onClick={handleBack}
          />
        </div>
        <div className="myorder-text">Order</div>
        <div className="myorder-mid-bg">
          <br />
          <div className="myorder-tab">
            <h3
              onClick={() => {
                setPast(true);
                setCurrent(false);
              }}
            >
              Past Orders
            </h3>
            <h3
              onClick={() => {
                setCurrent(true);
                setPast(false);
              }}
            >
              Current Orders
            </h3>
          </div>
          <div className="myorder-line">
            {past ? (
              <img src={arrow} alt="arrow" height="20%" width="45%" />
            ) : (
              <img src={noArrow} alt="noarrow" height="20%" width="45%" />
            )}
            {current ? (
              <img src={arrow} alt="arrow" height="20%" width="45%" />
            ) : (
              <img src={noArrow} alt="noarrow" height="20%" width="45%" />
            )}
          </div>
          {past ? (
            pastOrder && pastOrder.length !== 0 ? (
              showPastOrder()
            ) : (
              <div className="driver-task-word2">No Past Order yet!</div>
            )
          ) : null}
          {current ? showDepositOrder() : null}
          {current ? showPaymentOrder() : null}
          {current ? showCollectOrder() : null}
          {current ? showCurrentOrder() : null}
          {current ? (
            currentOrder &&
            currentOrder.length === 0 &&
            collectOrder &&
            collectOrder.length === 0 &&
            paymentOrder &&
            paymentOrder.length === 0 &&
            depositOrder &&
            depositOrder.length === 0 ? (
              <div className="driver-task-word2">No Active Order!</div>
            ) : null
          ) : null}
        </div>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        ariaHideApp={false}
        className="myorder-modal-cancel"
      >
        <br />
        <div className="modal-word2">Confirm to cancel this Order?</div>
        <center>
          <img src={exclamation} alt="exclamation" />
          <br />
          <button
            className="modal-confirm-button1"
            disabled={disabled}
            onClick={(e) => deleteOrder(e)}
          >
            YES
          </button>
          <button className="modal-confirm-button1" onClick={handleClose}>
            NO
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
    </>
  );
}

export default Myorder;
