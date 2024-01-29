import './order.css';

import React, { useEffect, useState } from 'react';
import { checkCode, clearError } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Modal from '@mui/material/Modal';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import backArrow from '../../assets/images/back-arrow.png';
import moment from 'moment';
import promo from '../../assets/order/order-promo.png';
import rightArrow from '../../assets/order/order-rightArrow.png';

function OrderDetails() {
  const history = useNavigate();
  const location = useLocation();
  const { discountData, error } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const files = location.state.files;
  const serviceType = location.state.type;
  const day = location.state.collectDate;
  const lockerId = location.state.lockerNo;
  const collectDate = moment(new Date(day)).format('YYYY-MM-DD');
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  const orderNote = location.state.note;
  const itemData = location.state.itemList;
  const totalQty = itemData
    .map((qty) => {
      return qty.qty;
    })
    .reduce((a, b) => a + b, 0);
  let totalOrder = itemData
    .map((price) => {
      return price.price * price.qty;
    })
    .reduce((a, b) => a + b, 0);
  let totalWithTax = totalOrder + totalOrder * 0.06;
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [orderAmount, setOrderAmount] = useState(0);
  const [orderAmountTax, setOrderAmountTax] = useState(0);
  const [promoCodeData, setPromoCodeData] = useState(null);

  useEffect(() => {
    setOrderAmount(totalOrder);
    setOrderAmountTax(totalWithTax);

    if (error) {
      setPromoCodeData(null);
      setPromoCode('');
    }    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (discountData) {
      setPromoOpen(false);
    }
    // eslint-disable-next-line
  }, [discountData]);

  const handleBack = () => {
    history(-1);
  };

  const handlePromoOpen = () => setPromoOpen(true);

  const handleChange = (event) => {
    setPromoCode(event.target.value.toUpperCase());
  };

  const handlePromoClose = () => {
    dispatch(clearError());
    setPromoOpen(false);
  };

  const codeClear = () => {
    setPromoCodeData(null);
    setPromoCode('');
    setPromoOpen(true);
    setOrderAmount(totalOrder);
    setOrderAmountTax(totalWithTax);
    dispatch(clearError());
  };

  const codeSubmit = () => {
    let cusId = location.state.customer_id;
    let serviceType = location.state.type;
    let userlocation = location.state.location;
    if (!promoCode) {
      setPromoCodeData(null);
      setPromoCode('');
      setOrderAmount(totalOrder);
      setOrderAmountTax(totalWithTax);
    }
    console.log('checkcode', promoCode, serviceType, userlocation);
    if (cusId && serviceType && userlocation && promoCode) {
      dispatch(
        checkCode({
          code: promoCode,
          userId: cusId,
          serviceType,
          location: userlocation,
        })
      );
    }
  };

  useEffect(() => {
    let order = totalOrder;
    let orderTax = totalWithTax;
    // console.log(discountData);
    if (discountData) {
      if (discountData.type === 'Rate') {
        order = totalOrder - totalOrder * (discountData.amount / 100);
        orderTax = order + order * 0.06;
        if (order <= 0 || orderTax <= 0) {
          order = 0;
          orderTax = 0;
        }
        // console.log(order, orderTax);
        setOrderAmount(order);
        setOrderAmountTax(orderTax);
        setPromoCodeData(discountData);
      } else if (discountData.type === 'Flat') {
        order = totalOrder - discountData.amount;
        orderTax = order + order * 0.06;

        if (order <= 0 || orderTax <= 0) {
          order = 0;
          orderTax = 0;
        }
        // console.log(order, orderTax);
        setOrderAmount(order);
        setOrderAmountTax(orderTax);
        setPromoCodeData(discountData);
      }
    }
    // setPromoOpen(false);
    // eslint-disable-next-line
  }, [discountData]);

  const goNext = () => {
    let nextData = {
      ...location.state,
      totalQty,
      totalOrder: totalOrder,
      totalWithTax: totalWithTax,
      codeData: promoCodeData ? promoCodeData : {},
    };

    history('/customer/order-confirmation', {
      state: nextData,
    });
  };

  const steps = [
    'Dropped off at Locker ' + lockerId + ' - [' + todayDate + ']',
    'Picked up for Cleaning',
    `Ready to Collect`,
  ];

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
          <p className="support-text">Order Details</p>
        </center>
        <div className="order-top-bg">
          <div className="order-steps">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={0} orientation="vertical">
                {steps.map((label, key) => (
                  <Step key={key}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <Divider />
          <div className="order-top-details">
            Collection Date : {collectDate}
          </div>
          <Divider />
          <div className="order-top-details">
            Location : {location.state.location}
          </div>
          <Divider />
          <div className="order-top-details">Category : {serviceType}</div>
          <div className="order-mid-bg">
            {itemData.length &&
              itemData.map((item, idx) => (
                <div key={idx}>
                  <div className="order-mid-flex1">
                    <div className="order-mid-details">
                      {item.qty} X {item.name}
                    </div>
                    <div className="price-flex">RM {item.price}</div>
                  </div>
                  <Divider />
                </div>
              ))}
          </div>
        </div>
        <div className="order-bottom-bg">
          <div className="order-bottom-details">
            <br />
            {files.length ? <p>Uploaded Photo :</p> : ''}
            {files.length
              ? files.map((data) => (
                  <span>
                    {' '}
                    <img
                      style={{ objectFit: 'cover' }}
                      src={data.uri}
                      alt=""
                      height="150"
                      width="150"
                    />{' '}
                  </span>
                ))
              : null}
          </div>
          {orderNote ? (
            <>
              {' '}
              <br />
              <Divider />
              <p className="order-bottom-details">Note : {orderNote}</p>{' '}
            </>
          ) : (
            ''
          )}
          {promoCodeData ? (
            <div
              style={{ textAlign: 'left', paddingLeft: '11%' }}
              onClick={handlePromoOpen}
            >
              <h6 style={{ color: '#023A51' }}>
                <strong>Discount Code: {discountData.code} (</strong>
                {discountData.type === 'Flat' ? ' RM' : ''}
                {discountData.amount}
                {discountData.type === 'Rate' ? '%' : ''}
                <strong> )</strong>
              </h6>
            </div>
          ) : (
            <div className="order-bottom-flex1">
              <img
                src={promo}
                alt="promo"
                className="order-promo-img"
                style={{ marginLeft: '10%' }}
              />
              <div className="order-mid-details">Promo Code</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                style={{ marginRight: '10%' }}
                onClick={handlePromoOpen}
              />
            </div>
          )}
          <br />
          <Divider />
          <div className="order-mid-flex1">
            <div className="order-subtotal-details">
              Subtotal ({totalQty} items)
            </div>
            <div className="order-bottom-total">
              RM {orderAmount.toFixed(2)}
            </div>
          </div>
          <Divider />
          <div className="order-mid-flex1">
            <div className="order-total-details">Total (incl. tax)</div>
            <div className="order-total-price">
              RM {orderAmountTax.toFixed(2)}
            </div>
          </div>
          <br />
          <center>
            <button className="order-button" onClick={() => goNext()}>
              Place Order
            </button>
          </center>
          <Modal
            open={promoOpen}
            onClose={handlePromoClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="note-modal">
              <div className="order-modal-arrowback">
                <img
                  src={backArrow}
                  alt="backArrow"
                  onClick={handlePromoClose}
                  style={{ width: '50%', height: '50%' }}
                />
              </div>
              <p className="order-modal-text">Promo Code</p>
              <input
                value={promoCode}
                onChange={handleChange}
                className="order-modal-promo"
                placeholder="Please enter promo code."
                style={{ textAlign: 'center' }}
              ></input>
              <br />
              {error ? (
                <div>
                  <br />
                  <p style={{ color: 'red' }}>{error}</p>
                </div>
              ) : (
                ''
              )}

              <button
                className="modal-button"
                type="submit"
                onClick={codeSubmit}
              >
                Apply
              </button>
              <button
                className="modal-button"
                type="submit"
                onClick={codeClear}
              >
                Clear
              </button>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
