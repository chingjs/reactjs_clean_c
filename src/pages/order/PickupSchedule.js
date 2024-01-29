import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import './order.css';
import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useMemo, useState } from 'react';
import {
  getAvailableLocker,
  getSmallLocker,
} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Calendar } from 'react-calendar';
import { Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import backArrow from '../../assets/images/back-arrow.png';
import dropdown from '../../assets/order/order-dropdown.png';

function PickupSchedule() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleBack = () => {
    history(-1);
  };
  const { locker, small } = useSelector((state) => state.userReducer);
  const [value, onChange] = useState();
  const [modalOpen, setModalOpen] = useState(true);
  const [error, setError] = useState('');
  const [lockerNo, setLockerNo] = useState('');
  const [modalInput, setModalInput] = useState('');
  const lockerId = location.state.lockerId;
  const itemCat = location.state.type;
  const todayDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  };
  const todayDay = new Date().getDay();
  const minDate = useMemo(() => {
    if (todayDay >= 2 && (itemCat === 'Garment' || itemCat === 'Laundry')) {
      // console.log('garment + household w/ weekend')
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 4)); //4
      return new Date(todayDate.year, todayDate.month, todayDate.day + 4); //4
    } else if (
      todayDay < 2 &&
      (itemCat === 'Garment' || itemCat === 'Laundry')
    ) {
      console.log('garment w/o weekend');
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 4)); //4
      return new Date(todayDate.year, todayDate.month, todayDate.day + 4); //4
    }
    if (todayDay >= 2 && itemCat === 'Household') {
      // console.log('garment + household w/ weekend')
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 5)); //5
      return new Date(todayDate.year, todayDate.month, todayDate.day + 5); //5
    } else if (todayDay < 2 && itemCat === 'Household') {
      console.log('garment w/o weekend');
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 5)); //5
      return new Date(todayDate.year, todayDate.month, todayDate.day + 5); //5
    } else if (todayDay === 0 && itemCat === 'Shoe') {
      console.log('shoe w/o weekend');
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 7)); //7
      return new Date(todayDate.year, todayDate.month, todayDate.day + 7); //7
    } else if (todayDay !== 0 && itemCat === 'Shoe') {
      console.log('shoe w/o weekend');
      onChange(new Date(todayDate.year, todayDate.month, todayDate.day + 6)); //6
      return new Date(todayDate.year, todayDate.month, todayDate.day + 6); //6
    }
    // eslint-disable-next-line
  }, [todayDay]);

  const maxDate = minDate;
  const handleModalOpen = () => {
    dispatch(getAvailableLocker({ lockerId }));
    dispatch(getSmallLocker({ lockerId }));
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setLockerNo(modalInput);
    setModalOpen(false);
  };
  const handleModalExit = () => {
    setModalInput(lockerNo);
    setModalOpen(false);
  };
  const [list, setList] = useState({ options: [], loading: false });

  const checkError = () => {
    const newData = {
      ...location.state,
      lockerNo: lockerNo,
      collectDate: value,
    };

    if (value && lockerNo) {
      history('/customer/order-details', { state: newData });
    } else {
      setError('Must choose a Looker No and Collection Day!');
    }
  };
  useEffect(() => {
    if (itemCat === 'Laundry') {
      dispatch(getSmallLocker({ lockerId }));
    } else {
      dispatch(getAvailableLocker({ lockerId }));
    }
    // eslint-disable-next-line
  }, [lockerId, itemCat]);

  // console.log(locker);
  useEffect(() => {
    if (itemCat === 'Laundry') {
      setList({ options: small, loading: true });
    } else {
      if (locker) {
        setList({ options: locker, loading: true });
      }
    } // eslint-disable-next-line
  }, [locker, small]);
  // console.log(locker)
  return (
    <>
      <div className="collection-full-bg">
        <center>
          {/* {console.log('checkPickup', newData)} */}
          <div>
            <img
              src={backArrow}
              alt="backArrow"
              className="collection-arrowback"
              onClick={handleBack}
            />
          </div>
          <p>{location.state.location}</p>
          <p className="pickup-text">Select Locker</p>
          <div
            className="collection-compartment"
            onClick={() => {
              handleModalOpen();
            }}
          >
            Locker Number : {lockerNo}
            {!lockerNo ? <img src={dropdown} alt="" /> : null}
          </div>
        </center>
        <center>
          <div className="collection-mid-bg">
            <div className="pickup-mid-text">
              <p>Your Collection Date</p>
            </div>
            <div className="calendar-div">
              <Calendar
                onChange={onChange}
                value={value}
                tileClassName="calendar-tile"
                minDate={minDate}
                maxDate={maxDate}
                // tileDisabled={({ date }) => date.getDate() === new Date('January 21, 2023').getDate() || date.getDate() === new Date('January 22, 2023').getDate() || date.getDate() === new Date('January 23, 2023').getDate()}
              />
            </div>

            {/* {console.log("datecheck", minDate.getDay())} */}
            <br />
            <div className="pickup-error">{error}</div>
            <button
              className="collection-bottom-button"
              onClick={() => checkError()}
            >
              Continue
            </button>
          </div>
        </center>
        <Modal
          open={modalOpen}
          onClose={handleModalExit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="locker-modal">
            <p className="order-modal-text">Select Compartment Number</p>
            <Divider />
            <InputLabel>Compartment Number</InputLabel>
            <Select
              style={{ width: '150px' }}
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
            >
              {list.options && list.options.length ? (
                list.options.map((locker, idx) => (
                  <MenuItem key={idx} value={locker.name}>
                    {locker.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Lockers are fully occupied</MenuItem>
              )}
            </Select>

            <button
              className="top-button1"
              type="submit"
              onClick={handleModalClose}
            >
              Save
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default PickupSchedule;
