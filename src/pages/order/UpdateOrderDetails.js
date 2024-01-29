import './order.css';
import '../modal/modal.css';

import React, { useState } from 'react';
import { completeOrder, openLocker } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Modal from 'react-modal';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import backArrow from '../../assets/images/back-arrow.png';
import { getOrderDetails } from '../../redux/actions/adminActions';
import moment from 'moment';
import { useEffect } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import rightArrow from "../../assets/order/order-rightArrow.png";

// import axios from 'axios';

// import { getRepayment } from '../../redux/actions/userActions';
// import tshirt from '../../assets/typeofService/top-tshirt.png';

// import promo from "../../assets/order/order-promo.png";
// import payment from "../../assets/order/order-payment.png";

// import discount from "../../assets/images/discount.png";

// import Modal from '@mui/material/Modal';

function UpdateOrderDetails() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [step, setStep] = useState(0);
  const handleBack = () => {
    history('/customer/myorder');
  };
  const [errorOpen, setErrorOpen] = useState(false);
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  // const serviceType = location.state.type;
  // console.log(location.state);
  const { orderDetails, discountAmount, error, success } = useSelector(
    (state) => state.adminReducer
  );
  // const customerDate = location.state.pick_up_date;
  const customerDate = location.state.collectedDate;
  const orderDate = moment(new Date(location.state.createdAt)).format(
    'YYYY/MM/DD'
  );
  const collectDate = customerDate
    ? moment(new Date(customerDate)).format('YYYY/MM/DD')
    : '';
  const pickup_time = location.state.pick_up_time;
  const delivered_time = location.state.delivered_time;
  const orderNote = location.state.note;
  const orderLongId = location.state.oid;
  const serviceType = location.state.serviceType;
  const lockerId = location.state.lockerId;
  const collectLockerId = location.state.collectLockerId;
  const totalQty = location.state.quantity;
  const totalPrice = location.state.price;
  const orderStatus = location.state.status;
  const orderLocation = location.state.location;
  const uploadPhoto =
    location.state.images &&
    location.state.images.map((img) => (
      <img src={img} alt="" height="120" width="auto" />
    ));

  const [totalAmount, setTotalAmount] = useState();
  const [totalQuantiti, setTotalQuantiti] = useState();
  const [orderId, setOrderId] = useState(null);
  const [data, setData] = useState(null);
  const [lockerNo, setLockerNo] = useState(null);
  const [unlock, setUnlock] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [promoOpen, setPromoOpen] = useState(false);
  // const [promoCode, setPromoCode] = useState("");

  // const handlePromoOpen = () => setPromoOpen(true);
  // const handleChange = (event) => {
  //   setPromoCode(event.target.value);
  // }
  // const handlePromoClose = () => {
  //   setPromoOpen(false);
  // }

  // console.log('checkData', location.state);
  useEffect(() => {
    const oid = location.state.oid;
    dispatch(getOrderDetails({ oid }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(discountAmount);
    if (orderDetails) {
      // console.log(orderDetails);
      let amount = 0;
      let quantiti = 0;
      for (let i = 0; i < orderDetails.length; i++) {
        if (orderDetails[i].cancel === true) {
          amount = orderDetails[i].price * orderDetails[i].qty + amount;
          quantiti = orderDetails[i].qty + quantiti;
        }
      }

      setTotalAmount(amount.toFixed(1));
      setTotalQuantiti(quantiti);
      // console.log(amount, quantiti)
    }
    // eslint-disable-next-line
  }, [orderDetails]);

  const steps = [
    'Dropped off at locker ' + lockerId + ' - [' + orderDate + ']',
    'Picked up for Cleaning',
    `Your items is ready to collect at Locker ${
      collectLockerId ? collectLockerId : 'X'
    }`,
  ];
  const checkSteps = () => {
    if (pickup_time && !delivered_time) {
      setStep(1);
    } else {
      setStep(2);
    }
  };
  const showPast = () => {
    if (orderStatus === 'completed') {
      setStep(3);
    }
  };

  // Modify here
  const unlockLocker = (lockerNo) => {
    const id = location.state.orderId;
    // console.log("checkdloa", id)
    setDisabled(true);
    const newData = {
      location: location.state.location,
      lockerId: lockerNo,
    };
    dispatch(openLocker(newData));
    setLockerNo(lockerNo);
    setOrderId(id);
    setData(location.state);
    setUnlock(true);

    // localStorage.setItem('openLockerNo', lockerNo);

    // dispatch(completeOrder({ id, lockerNo }));
    // history('/customer/success-unlock', { state: location.state });

    // axios.post('/api/locker/unlock', newData)
    //   .then(res => {
    //     if (res) {
    //       localStorage.setItem('openLockerNo', lockerNo);
    //       dispatch(completeOrder({ id, lockerNo }));
    //       history('/customer/success-unlock', { state: location.state });
    //     }
    //   })
    //   .catch(err => {
    //     setErrorMsg(err.response.data.error);
    //     setErrorOpen(true);
    //   });
  };

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      setErrorOpen(true);
      setUnlock(false);
      setDisabled(false);
    } else if (success && data && lockerNo && orderId && unlock) {
      localStorage.setItem('openLockerNo', lockerNo);
      dispatch(completeOrder({ orderId, lockerNo }));
      history('/customer/success-unlock', { state: data });
    } // eslint-disable-next-line
  }, [error, success, lockerNo, orderId, data, unlock]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pickup_time) {
      checkSteps();
      showPast();
    }
    // eslint-disable-next-line
  }, []);
  const forwardSupport = () => {
    history('/customer/support', { state: { id: orderLongId } });
  };
  return (
    <>
      <div className="blue-bg">
        <div className="order-arrowback">
          <img
            src={backArrow}
            alt="backArrow"
            className="arrowbutton"
            onClick={handleBack}
          />
        </div>
        <center>
          <p className="order-text">Order Details</p>
        </center>
        <div className="order-top-left">Order ID</div>
        <div className="order-top-right">{orderLongId}</div>
        <div className="order-top-bg">
          <div className="order-steps">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={step} orientation="vertical">
                {steps.map((label, key) => (
                  <Step key={key}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <Divider />
          {/* <img src={calendar} alt="calendar" className="order-img" /> */}
          <div className="order-top-details">
            Collection Date : {collectDate ? collectDate : ''}
          </div>
          <Divider />
          <div className="order-top-details">Location : {orderLocation}</div>
          <Divider />
          <div className="order-top-details">Category : {serviceType}</div>
          <Divider />
          <div className="order-mid-bg">
            {orderDetails &&
              orderDetails.map((item, key) => (
                <div key={key}>
                  <div className="order-mid-flex1">
                    {item.cancel === false ? (
                      <div className="order-mid-details">
                        {item.qty}X
                        <div style={{ marginLeft: '10%', display: 'inline' }}>
                          {item.item}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="order-mid-details"
                        style={{ color: '#a9a9a9' }}
                      >
                        <s>{item.qty}X</s>
                        <div
                          style={{
                            marginLeft: '10%',
                            display: 'inline',
                            color: '#a9a9a9',
                          }}
                        >
                          <s>{item.item}</s>
                        </div>
                        {/* <div style={{ marginLeft: '10%', display: 'inline', color: "red" }}>Cancelled</div> */}
                      </div>
                    )}
                    {item.cancel === false ? (
                      <div className="price-flex">RM {item.price}</div>
                    ) : (
                      <div className="price-flex">
                        <s style={{ color: '#a9a9a9' }}>- RM {item.price}</s>
                      </div>
                    )}
                  </div>
                  <Divider />
                </div>
              ))}
          </div>
        </div>
        <div className="order-bottom-bg">
          {uploadPhoto && uploadPhoto.length ? (
            <div className="order-bottom-details">
              <Divider />
              <p>Uploaded Photo :</p>
              {uploadPhoto}
            </div>
          ) : (
            ''
          )}
          {orderNote ? (
            <p className="order-bottom-details">Note : {orderNote}</p>
          ) : (
            ''
          )}
          {/* <Divider /> */}
          {/* <div className="order-bottom-flex1">
            <img src={promo} alt='promo' className="order-promo-img" />
            <div className="order-promo-details">Promo Code</div>
            <img src={rightArrow} alt='rightArrow' onClick={handlePromoOpen} />
          </div> */}

          <div className="order-mid-flex1">
            <div className="order-mid-details">Subtotal ({totalQty} items)</div>
            <div className="order-bottom-total">
              RM {(totalPrice - discountAmount).toFixed(2)}
            </div>
          </div>
          <Divider />
          {totalQuantiti !== 0 && totalAmount !== 0 ? (
            <div>
              <div className="order-mid-flex1">
                <div className="order-mid-details">
                  Total Cancelled ({totalQuantiti} items)
                </div>
                <div className="order-bottom-total">- RM {totalAmount}</div>
              </div>
              <Divider />
            </div>
          ) : (
            ''
          )}
          <div className="order-mid-flex1">
            <div className="order-mid-details">Total (incl. tax)</div>
            <div className="order-bottom-total">
              RM{' '}
              {parseFloat(
                totalPrice -
                  totalAmount -
                  discountAmount +
                  (totalPrice - totalAmount - discountAmount) * 0.06
              ).toFixed(2)}
            </div>
          </div>
          <br />
          {step === 2 && orderStatus !== 'completed' ? (
            <center>
              <button
                className="order-button"
                disabled={disabled}
                onClick={() => unlockLocker(collectLockerId)}
              >
                Unlock Locker {collectLockerId}
              </button>
            </center>
          ) : null}
          {/* <Modal
            open={promoOpen}
            onClose={handlePromoClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="note-modal">
              <div className="order-modal-arrowback">
                <img src={backArrow} alt='backArrow' onClick={handlePromoClose} />
              </div>
              <p className="order-modal-text">
                Promo Code
              </p>
              <Divider />
              <input value={promoCode} onChange={handleChange} className="order-modal-promo " placeholder="Please enter promo code."></input>
              <button
                className='top-button1'
                type="submit"
                onClick={handlePromoClose}>
                Apply
              </button>
            </Box>
          </Modal> */}
          <center>
            <button
              className="update-support-button"
              onClick={() => forwardSupport()}
            >
              Contact Mr.Clean
            </button>
          </center>
        </div>
      </div>
      <Modal
        isOpen={errorOpen}
        onRequestClose={handleErrorClose}
        ariaHideApp={false}
        className="myorder-modal-cancel"
      >
        <br />
        <div className="modal-word2">{errorMsg}</div>
        <center>
          {/* <img src={exclamation} alt="exclamation" />
          <br /> */}
          <button className="modal-confirm-button1" onClick={handleErrorClose}>
            Close
          </button>
        </center>
      </Modal>
    </>
  );
}

export default UpdateOrderDetails;
