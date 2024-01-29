import React, { useEffect, useState } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFabricPrice, getSmallLocker } from '../../redux/actions/userActions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import { Divider } from '@mui/material';

function Home2() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleBack = () => {
    history('/customer/home');
  };
  const lockerId = location.state.lockerId;
  const { servicePrice } = useSelector((state) => state.userReducer);
  const handleModalClose = () => {
    setShow(false);
  };
  // console.log('home2', location.state)
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFabricPrice({ strategy: location.state.strategy }));
    dispatch(getSmallLocker({ lockerId }));
    // eslint-disable-next-line
  }, []);

  const goNormal = (price) => {
    const newData = {
      ...location.state,
      price
    }
    history('/customer/washing/stepone', {
      state: newData

    })
  }

  return (
    <>
      <div className="home2-arrowback">
        <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
      </div>
      <p className="home-word2">Category</p>
      <div className="home-body-btm-main">
        <center>
          <br />
          <p className="home-word3">Please choose a Category </p>
          <br />
          <div className="category">
                <div className="washingandirontext">
              <p style={{ marginTop: '5%' }}
                onClick={() => goNormal(servicePrice.garment)}
              >
                Garment
              </p>
            </div>
          </div> 
        <div className="category">
            <div className="washingandirontext">
              <p style={{ marginTop: '5%' }}
                onClick={() => goNormal(servicePrice.household)}
              >
                Household
              </p>
            </div>
          </div> 
         <div className="category">
            <div className="washingandirontext">
              <p style={{ marginTop: '5%' }}
                onClick={() =>
                  goNormal(servicePrice.shoe)}
              >
                Shoe
              </p>
            </div>
          </div> 
        </center>
      </div>
      <Modal
        open={show}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="home2-modal">
          <p className="order-modal-text">Message</p>
          <Divider />
          <br />
          <InputLabel>No available locker for this item type.</InputLabel>


          <button
            className="home2-modal-button"
            type="submit"
            onClick={handleModalClose}
          >
            Close
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default Home2;
