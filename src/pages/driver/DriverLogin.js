import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './driver.css';
import { loginDriver } from '../../redux/actions/driverActions';
import { useDispatch, useSelector } from 'react-redux';

function DriverLogin() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { operator, error } = useSelector((state) => state.driverReducer);

  const initialValues = { driver_phone: '', password: '' };
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState(initialValues);

  const handleVerify = (e) => {
    setSubmit(true);
    e.preventDefault();
    const sendData = {
      phone_number: data.driver_phone,
      password: data.password,
    };
    localStorage.setItem('driver_phone', data.driver_phone);
    dispatch(loginDriver(sendData));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (operator !== null && submit) {
      localStorage.setItem('operator_id', operator.oid);
      history('/driver/home');
    }
    // eslint-disable-next-line
  }, [operator]);
  console.log('checkerror', error);
  console.log('checksend data', operator);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <div className="welcome-word1">
        <p>Welcome Back</p>
      </div>
      <center>
        <form onSubmit={handleVerify}>
          <div className="marginTop-login-form">
            <div className="label-margin-login">
              <label>Phone</label>
            </div>
            <div>
              <input
                name="driver_phone"
                className="phone-input"
                value={data.driver_phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-msg">{error}</div>
            <div className="label-margin-login">
              <label>Password</label>
            </div>
            <input
              name="password"
              value={data.password}
              type="password"
              className="phone-input"
              onChange={handleChange}
              required
            ></input>
            <br />
            <br />
            <br />
            <br />
            {/* <div className="forgot-password">
              <p
                onClick={() => {
                  history('/driver-forgot-password');
                }}
              >
                Forgot password?
              </p>
            </div> */}
            <button className="welcome-button1" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </center>
    </>
  );
}

export default DriverLogin;
