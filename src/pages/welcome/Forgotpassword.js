import backArrow from '../../assets/images/back-arrow.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import { clearError, resendOtp } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Forgotpassword() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState({ phone: '', country: '60' });
  const [submit, setSubmit] = useState(false);
  const [msg, setMsg] = useState('');
  const handleBack = () => {
    history('/customer/login');
  };
  const { message, error } = useSelector((state) => state.userReducer);
  const sendOTP = (e) => {
    e.preventDefault();
    console.log(phone.country, phone.phone)
    if (!phone) {
      setMsg('Invalid Phone Number!');
    } else {
      setSubmit(true);
      dispatch(resendOtp({ phone: phone.country + phone.phone }));
    }
  };
  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line
  }, []);

  // console.log("msg", message , submit)
  useEffect(() => {
    if ((message !== null) & submit) {
      history('/customer/forgot-password/verify', { state: phone.country + phone.phone });
    }
    // eslint-disable-next-line
  }, [message, submit]);

  const handlePhoneNumberChange = (value, country) => {
    const trimmedPhoneNumber = value.slice(country.dialCode.length).trim();
    setPhone({ country: country.dialCode, phone: trimmedPhoneNumber });
  };

  return (
    <>
      <div className="signin-arrowback">
        <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
      </div>
      <div className="welcome-word1">
        <p>Forgot Password</p>
      </div>
      <center>
        <form>
          <div className="marginTop-login-form">
            <br />
            <p className="welcome-word2">Please Enter Your Mobile Number</p>
            <div className="label-margin-login">
              <label for="email">Phone</label>
            </div>
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <Select
                // className="phone-country"
                value={phone.country}
                onChange={(e) => setPhone({ ...phone, country: e.target })}
              >
                <MenuItem value='60'>+60</MenuItem>

              </Select> {' '}
            </FormControl> */}
            <div style={{ textAlign: "center" }}>
              <PhoneInput
                country="my"
                value={phone.phoneNumber}
                onChange={handlePhoneNumberChange}
                specialLabel={""}
                enableSearch={true}
                dropdownStyle={{ height: '150px' }}
                inputStyle={{ color: 'black' }}
                // countryCodeEditable={false}
              />
            </div>
            {/* <input
              value={phone.phone}
              className="phone-special"
              onChange={(e) => setPhone({ ...phone, phone: e.target.value })}
              required
            /> */}

            <br />
            <div className="error-msg">{msg ? msg : error} </div>
            <br />
            <button className="welcome-button1" onClick={(e) => sendOTP(e)}>
              Reset
            </button>
          </div>
        </form>
      </center>
    </>
  );
}

export default Forgotpassword;
