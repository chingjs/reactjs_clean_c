import React, { useState } from 'react';
import header from '../../assets/images/header1.png';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate, useLocation } from 'react-router-dom';
import tshirt from '../../assets/typeofService/top-tshirt.png';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './typeofservice.css';
import { Divider } from '@mui/material';
import { useEffect } from 'react';

function WashingStepOne() {
  const [orderNote, setOrderNote] = useState('Write a Note to us');
  const location = useLocation();
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (orderNote === 'Write a Note to us') {
      setOrderNote('');
    }
    setOpen(true);
  };
  const handleClose = () => {
    if (orderNote === '') {
      setOrderNote('Write a Note to us');
    }
    setOpen(false);
  };
  const itemData = location.state.price
  const itemCat = location.state.price[0].service_type.name
  const [itemType, setItemType] = useState([itemData]);
  // console.log('location', location.state);

  const history = useNavigate();
  const handleBack = () => {
    history(-1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.state) {
      history('/customer/home2');
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setOrderNote(e.target.value);
  };

  const goUpload = () => {
    const itemList = itemType.filter(e => e.qty)
    let checkGarmentQty = itemList.map(a => { return a.qty }).reduce((a, b) => a + b, 0)
    if (checkGarmentQty > 10 && itemCat === 'Garment') {
      setSuccess(
        <div className="wash-error-msg">
          Max 10 Qty
        </div>
      );
    } else {
      if (itemList.length) {
        const newData = {
          ...location.state,
          itemList,
          customer_id: localStorage.getItem('customer_id'),
          note: orderNote === 'Write a Note to us' ? '' : orderNote,
          type: location.state.price[0].service_type.name,
        };
        // console.log('selectedItems', newData)
        history('/customer/uploadphoto', { state: newData });
      } else {
        setSuccess(
          <div className="wash-error-msg">
            Please choose atleast 1 Qty to continue
          </div>
        );
      }
    }
  };

  const onChageQty = (idx) => {
    if (itemCat === 'Laundry') {
      let newData = [...itemData]
      newData[idx].qty = newData[idx].qty ? newData[idx].qty : 0;
      newData[idx].qty = newData[idx].qty = 1
      setItemType(newData)
    }
    else {
      let newData = [...itemData]
      newData[idx].qty = newData[idx].qty ? newData[idx].qty : 0;
      newData[idx].qty = newData[idx].qty + 1
      setItemType(newData)
    }
  }
  const onChageQtyMinus = (idx) => {
    let newData = [...itemData]
    newData[idx].qty = newData[idx].qty ? newData[idx].qty : 0;
    newData[idx].qty = newData[idx].qty ? newData[idx].qty - 1 : 0
    setItemType(newData)
  }

  const displayDesc = (type) => {
    if (type === 'Garment')
      return 'Based on the fabric nature, we clean, iron, and return on a hanger.'
    else if (type === 'Household')
      return 'Based on the fabric nature, we clean, iron, and return folded.'
    else if (type === 'Shoe')
      return 'Based on the shoe material and design, we provide professional care.'
    else if (type === 'Laundry')
      return 'Perfect for everyday laundry. Your clothes get machine washed, tumble dry and return folded.'
  }

  return (
    <>
      <div>
        <div className="typeofservice-arrowback">
          <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
        </div>
        <img src={header} alt="header" className="top-header" />
        <div className="top-middle-div" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div className="toptext">{displayDesc(itemCat)}</div>
        </div>
        <div className="blue-bg-to-the-top">
          {itemCat === 'Laundry' ? <div style={{ color: 'red', display: 'flex', textAlign: 'justify', padding: '5%' }} >
            Note: Priced by the locker. So you can put your dirty garment in as long as it fits.
            You are not allowed to put household items, silk, leather, wedding dress, shoes, and bags.</div> : null}

          {itemCat === 'Household' ? <div style={{ color: 'red', display: 'flex', textAlign: 'justify', padding: '5%' }} >
            Note : A locker can fit a maximum of 2 comforters/ pillows. If you have more, please make a separate order.</div> : null}
          {itemData && itemData.map((type, idx) => (
            <div className="top-content-padding" key={idx}>
              <img
                className='washing-itemtype-icon'
                src={type.photo_url ? type.images : tshirt}
                alt="shirt"
              />
              <div style={{ marginLeft: '3%' }}>
                <p className="top-name">{type.name}</p>
                <p className="top-price"> RM {type.price} </p>
              </div>
              <div className="top-count">
                <img
                  alt="minus"
                  src={minus}
                  className="minus-icon"
                  onClick={() =>
                    onChageQtyMinus(idx)
                  }
                />
                <p className="tshirt-count">{itemType[idx] && itemType[idx].qty ? itemType[idx].qty : 0}</p>
                <img
                  alt="plus"
                  src={plus}
                  className="plus-icon"
                  onClick={() =>
                    onChageQty(idx, 1)
                  }
                />
              </div>
            </div>
          ))}


          <center>
            {success}
            <br />
            <div className="button-bottom">
              <button
                className="top-button2"
                type="submit"
                onClick={handleOpen}
              >
                {orderNote}
              </button>
              <button
                className="top-button1"
                onClick={() => goUpload()}
                type="submit"
              >
                Continue
              </button>
            </div>
          </center>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="note-modal">
              <p className="top-modal-text">Write a note to us</p>
              <Divider />
              <textarea
                value={orderNote}
                onChange={handleChange}
                className="top-text-area"
                placeholder="Enter Note..."
              ></textarea>
              <button
                className="top-button1"
                type="submit"
                onClick={handleClose}
              >
                Done
              </button>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default WashingStepOne;
