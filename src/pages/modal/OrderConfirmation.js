import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import exclamation from '../../assets/images/exclamation-mark.png';
import { useNavigate, useLocation } from 'react-router-dom';
import './modal.css';
import { createOrder, updateReserved } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function OrderConfirmation() {
  const history = useNavigate();
  const [submit, setSubmit] = useState(false);
  //const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    history(-1, { state: location.state });
  };
  const { url, code } = useSelector((state) => state.userReducer);
  // console.log('url',url)
  const makePayment = () => {
    const day = location.state.collectDate
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to other page here
    }, 1500);

    const sendData = {
      files: location.state.files,
      phone_number: localStorage.getItem("customer_phone"),
      pick_up_date: day,
      location: location.state.location,
      lockerId: location.state.lockerNo,
      note: location.state.note,
      customerId: location.state.customer_id,
      serviceType: location.state.itemList[0].service_type.name,
      serviceTypeId: location.state.itemList[0].service_type.id,
      itemList: location.state.itemList,
      quantity: location.state.totalQty,
      totalOrder: parseFloat(location.state.totalOrder),
      totalWithTax: parseFloat(location.state.totalOrder + location.state.totalOrder * 0.06).toFixed(2),
      codeData: location.state.codeData

    };
    // console.log('check sendData', sendData);

    const lockerData = {
      location: location.state.location,
      lockerNo: location.state.lockerNo,
      status: 'true',
    }

    dispatch(updateReserved(lockerData));
    dispatch(createOrder(sendData));
    setSubmit(true);

    // setDisabled(true);
  };

  useEffect(() => {
    if (url && submit) {
      window.location.href = url;
      // history(url)
    }
    else if(code && submit){
      history('/customer/order-completed');
    }

    // eslint-disable-next-line
  }, [url, submit, code]);

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
            Please confirm your order quantity before proceeding
          </p>
          <img src={exclamation} alt="exclamation" />
        </center>
        <center>


          <button
            className="modal-confirm-button1"
            disabled={loading}
            //loading={loading}
            onClick={makePayment}
          >

            Confirm
          </button>
          <button className="modal-confirm-button1" onClick={handleClose}>
            Re-check
          </button>
        </center>
      </Modal>
    </div>
  );
}
export default OrderConfirmation;
