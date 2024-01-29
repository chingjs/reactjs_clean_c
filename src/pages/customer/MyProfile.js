import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/images/back-arrow.png';
import profile from '../../assets/profile/profile-logo.png';
import check from '../../assets/profile/profile-check.png';
import rightArrow from '../../assets/order/order-rightArrow.png';
import './customer.css';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, editProfile } from '../../redux/actions/userActions';
import { format } from 'date-fns';
import Resizer from 'react-image-file-resizer';
import moment from 'moment';

import { resizeFile } from '../../utils/helperFunc';

function MyProfile() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleBack = () => {
    history('/customer/home', user);
  };
  const inputRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [uri, setUri] = useState('');
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const { user, error, message } = useSelector((state) => state.userReducer);
  const [modalInput, setModalInput] = useState({
    full_name: '',
    email: '',
    birthday: '',
    phone: '',
    gender: '',
    photoUrl: '',
    address: '',
    phone_number: '',
    password: '',
    checkPass: '',
    filetype: '',
  });
  const [data, setData] = useState({
    full_name: '',
    email: '',
    birthday: '',
    photoUrl: '',
    address: '',
    phone_number: '',
    gender: '',
    password: '',
    checkPass: '',
  });

  const handleImage = (e) => {
    // let fileInput = false;
    uploadReceiptOnChange(e);
    if (e.target.files) {
      Resizer.imageFileResizer(
        e.target.files[0],
        500,
        500,
        'PNG',
        30,
        0,
        (uri) => {
          setUri(uri);
        }
      );
    }
  };
  const phone = localStorage.getItem('customer_phone');
  useEffect(() => {
    if (phone) {
      dispatch(getProfile({ phone_number: phone }));
    } else {
      history('/customer/login');
    }
    // eslint-disable-next-line
  }, [phone]);

  useEffect(() => {
    const newData = {
      full_name: user?.full_name,
      email: user?.email,
      birthday: user?.birthday,
      phone_number: user?.phone_number,
      gender: user?.gender,
      address: user?.address,
      password: '',
      checkPass: '',
    };
    if (!uri) {
      setUri(user?.photo_url);
      setModalInput(newData);
      setData(newData);
    }

    // eslint-disable-next-line
  }, [user, uri, message]);

  const handleModalOpen = (type) => {
    setModalName(type);
    setModalOpen(true);
  };

  const modalInfo = useMemo(() => {
    if (modalName === 'full_name') {
      return {
        label: 'Full Name',
        placeholder: 'Please enter new Name',
      };
    } else if (modalName === 'email') {
      return {
        label: 'Email',
        placeholder: 'Please enter new Email Address',
      };
    } else if (modalName === 'address') {
      return {
        label: 'Home Address',
        placeholder: 'Please enter new Home Address',
      };
    } else if (modalName === 'gender') {
      return {
        label: 'Gender',
        placeholder: 'Gender',
      };
    } else if (modalName === 'birthday') {
      return {
        label: 'Birthday',
        placeholder: 'Please choose your birthday',
      };
    } else if (modalName === 'password') {
      return {
        label: 'Password',
        placeholder: 'Please enter new password',
      };
    } else {
      return {
        label: '',
        placeholder: '',
      };
    }
  }, [modalName]);

  const handleModalClose = () => {
    if (
      modalInput.checkPass === modalInput.password &&
      modalInput.email.includes('@')
    ) {
      setData(modalInput);
      setModalOpen(false);
    }
  };
  const handleModalExit = () => {
    setModalInput(data);
    setModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('data', data);

    dispatch(editProfile(data));
  };
  async function uploadReceiptOnChange(e) {
    const file = e.target.files[0];
    const resized = file && (await resizeFile(file));
    setData({ ...data, photoUrl: resized, filetype: file.type });
  }
  return (
    <>
      <div className="profile-bg">
        <center>
          <div className="profile-arrowback">
            <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
          </div>
          <p className="profile-header">My Profile</p>
        </center>
        <div className="profile-body-bg">
          <center>
            <div className="profile-flex">
              <div>
                {uri ? (
                  <img
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '35px',
                      borderRadius: '100px',
                    }}
                    src={uri}
                    alt=""
                  />
                ) : (
                  <div>
                    <img
                      src={profile}
                      className=""
                      alt=""
                      style={{
                        width: '100px',
                        height: '100px',
                        margin: '35px',
                        borderRadius: '100px',
                      }}
                    ></img>
                  </div>
                )}{' '}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  id="inputFile"
                  className="upload-button-my-profile"
                  onChange={handleImage}
                  hidden
                // required
                />
                <button
                  onClick={onButtonClick}
                  className="upload-button-my-profile"
                >
                  Upload Profile Image
                </button>
              </div>
            </div>
          </center>
          <br />
          <Divider />
          <form onSubmit={handleSubmit}>
            <div className="profile-flex">
              <div className="profile-flex-details"> Name</div>
              <div className="profile-data-flex">{modalInput.full_name}</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('full_name');
                }}
              />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Phone</div>
              <div className="profile-data-flex">{modalInput.phone_number}</div>
              <img src={check} alt="check" className="profile-check" />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Email Address</div>
              <div className="profile-data-flex">{modalInput.email}</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('email');
                }}
              />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Home Address</div>
              <div className="profile-data-flex">{modalInput.address}</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('address');
                }}
              />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Gender</div>
              <div className="profile-data-flex">{modalInput.gender}</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('gender');
                }}
              />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Birthday</div>
              <div className="profile-data-flex">
                {moment(new Date(modalInput.birthday)).format('YYYY/MM/DD')}
              </div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('birthday');
                }}
              />
            </div>
            <Divider />
            <div className="profile-flex">
              <div className="profile-flex-details"> Change Password</div>
              <div className="profile-data-flex">********</div>
              <img
                src={rightArrow}
                alt="rightArrow"
                className="profile-arrow"
                onClick={() => {
                  handleModalOpen('password');
                }}
              />
            </div>
            <center>
              <div className="support-success-msg">{message} </div>
              <div className="error-msg">{error}</div>
              <button className="profile-button" type="submit">
                Update
              </button>
            </center>
          </form>
          <Modal
            open={modalOpen}
            onClose={handleModalExit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="note-modal">
              <div className="order-modal-arrowback">
                <img
                  src={backArrow}
                  alt="backArrow"
                  style={{ height: '40px' }}
                  onClick={handleModalExit}
                />
              </div>
              <p className="order-modal-text">{modalName.toUpperCase()}</p>
              <Divider />
              {modalName !== 'password' &&
                modalName !== 'gender' &&
                modalName !== 'birthday' &&
                modalName !== 'email' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  label={modalInfo.label}
                  placeholder={modalInfo.placeholder}
                  value={modalInput[modalName]}
                  onChange={(e) =>
                    setModalInput({
                      ...modalInput,
                      [modalName]: e.target.value,
                    })
                  }
                />
              ) : null}
              {modalName === 'email' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  label={modalInfo.label}
                  placeholder={modalInfo.placeholder}
                  value={modalInput[modalName]}
                  onChange={(e) =>
                    setModalInput({
                      ...modalInput,
                      [modalName]: e.target.value,
                    })
                  }
                  helperText={
                    !modalInput.email.includes('@') ? (
                      <>
                        <p className="profile-pass-error">
                          Invalid email address
                        </p>
                      </>
                    ) : null
                  }
                />
              ) : null}
              {modalName === 'gender' ? (
                <FormControl fullWidth>
                  <InputLabel>{modalInfo.placeholder}</InputLabel>
                  <Select
                    value={modalInput[modalName]}
                    label={modalInfo.label}
                    onChange={(e) =>
                      setModalInput({
                        ...modalInput,
                        [modalName]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              ) : null}
              {modalName === 'birthday' ? (
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={modalInput[modalName]}
                      label={modalInfo.label}
                      onChange={(e) =>
                        setModalInput({
                          ...modalInput,
                          [modalName]: format(e, 'yyyy-MM-dd'),
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* {console.log('checkDate', modalInput[modalName])} */}
                  </LocalizationProvider>
                </FormControl>
              ) : null}
              {modalName === 'password' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  value={modalInput[modalName]}
                  label={modalInfo.label}
                  onChange={(e) =>
                    setModalInput({ ...modalInput, password: e.target.value })
                  }
                />
              ) : null}
              {modalName === 'password' ? (
                <TextField
                  value={modalInput.checkPass}
                  label="Confirm Password"
                  onChange={(e) =>
                    setModalInput({ ...modalInput, checkPass: e.target.value })
                  }
                  variant="outlined"
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  helperText={
                    modalInput.checkPass !== modalInput.password ? (
                      <p className="profile-pass-error">Password Not match!</p>
                    ) : null
                  }
                />
              ) : null}
              <Divider />
              {modalName === 'password' ? (
                <p></p>
              ) : (
                <p className="modal-message">
                  Please enter the correct information.
                </p>
              )}

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
      </div>
    </>
  );
}

export default MyProfile;
