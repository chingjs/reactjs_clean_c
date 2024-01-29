import './welcome.css';
import 'react-phone-input-2/lib/style.css';

import React, { useEffect, useState } from 'react';
import { clearError, loginUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PhoneInput from 'react-phone-input-2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import backArrow from '../../assets/images/back-arrow.png';

function Login() {
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handleBack = () => {
    history('/customer/welcome');
  };
  const { user, error } = useSelector((state) => state.userReducer);
  const initialValues = { customer_phone: '', password: '', country: '60' };
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState(initialValues);
  const [passwordShown, setPasswordShown] = useState(false);

  const checkLocker = async (lockerId) => {
    const res = await axios.post('/api/locker/checklocker', { lockerId });
    if (res) localStorage.setItem('location', res.data.data.id);
  };
  const handleVerify = (e) => {
    e.preventDefault();
    history('/customer/home');
    // const sendData = {
    //   phone_number: data.country + data.customer_phone,
    //   password: data.password,
    // };
    // localStorage.setItem('customer_phone', data.country + data.customer_phone);

    // dispatch(loginUser(sendData));
    // setSubmit(true);
  };

  useEffect(() => {
    // const lockerId = searchParams.get('locker');
    // console.log(lockerId);
    // if (lockerId) {
    //   checkLocker();
    // }
    // if (user && submit) {
    //   localStorage.setItem('customer_id', user.id);
    //   history('/customer/home');
    // }

    // dispatch(clearError());
    // eslint-disable-next-line
  }, [user, submit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePhoneNumberChange = (value, country) => {
    const trimmedPhoneNumber = value.slice(country.dialCode.length).trim();
    setData({
      ...data,
      country: country.dialCode,
      customer_phone: trimmedPhoneNumber,
    });
  };

  return (
    <>
      <div className="signin-arrowback">
        <img
          src={backArrow}
          alt="backArrow"
          className="arrowbutton"
          onClick={handleBack}
        />
      </div>
      <div className="welcome-word1">
        <p>Sign In To Continue</p>
      </div>
      <center>
        <form onSubmit={handleVerify}>
          <div className="marginTop-login-form">
            <div className="label-margin-login">
              <label>Phone</label>
            </div>
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <Select
                value={data.country}
                onChange={(e) => setData({ ...data, country: e.target })}
              >
                <MenuItem value='60'>+60</MenuItem>

              </Select>
            </FormControl>  */}
            <div style={{ textAlign: 'center' }}>
              <PhoneInput
                country="my"
                value={data.phoneNumber}
                onChange={handlePhoneNumberChange}
                specialLabel={''}
                enableSearch={true}
                dropdownStyle={{ height: '150px' }}
                inputStyle={{ color: 'black' }}
                // countryCodeEditable={false}
              />
            </div>{' '}
            {/* <input
              name="customer_phone"
              className="phone-special"
              value={data.customer_phone}
              onChange={handleChange}
              required
            /> */}
            <div className="error-msg">{error}</div>
            <div className="label-margin-login">
              <label>Password</label>
            </div>
            <input
              name="password"
              value={data.password}
              type={passwordShown ? 'text' : 'password'}
              className="phone-input"
              onChange={handleChange}
              required
            />
            <icon
              className="phone-input-password"
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? <Visibility /> : <VisibilityOffIcon />}
            </icon>
            <div className="forgot-password">
              <p
                onClick={() => {
                  history('/customer/forgot-password');
                }}
              >
                Forgot password?
              </p>
            </div>
            <button className="welcome-button1" type="submit">
              Sign In
            </button>
            <div className="signup-bottom">
              <p>
                {' '}
                Don't have an account? <a href="/customer/register">
                  Sign up
                </a>{' '}
              </p>
            </div>
          </div>
        </form>
      </center>
    </>
  );
}

export default Login;
