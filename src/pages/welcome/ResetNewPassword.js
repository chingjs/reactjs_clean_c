import backArrow from '../../assets/images/back-arrow.png';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './welcome.css';
import {resetPassword } from '../../redux/actions/userActions';

const ResetNewPassword = () => {
  const history = useNavigate();
  const location = useLocation();
  const initialValues = {
    phone_number: location.state,
    password: '',
  };

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [errorPassword, setErrorPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const { message, error } = useSelector((state) => state.userReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setErrorPassword('Password and confirmation password must be same.');
    } else {
      localStorage.setItem('customer_phone', formValues.phone_number);
      setSubmit(true);
      dispatch(resetPassword(formValues));
    }
  };

  useEffect(() => {
    if (message && submit) {
      setErrorPassword(
        <div className="support-success-msg">Success updated! </div>
      );
      // eslint-disable-next-line
    }
  }, [message, submit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleBack = () => {
    history('/customer/login');
  };
  return (
    <>
      <div className="signin-arrowback">
        <img src={backArrow} alt="backArrow" onClick={handleBack} />
      </div>
      <div className="welcome-word1">
        <p>Reset Password</p>
      </div>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="marginTop-login-form">
            <div className="label-margin-login">
              <label>Password</label>
            </div>
            <input
              name="password"
              minLength={6}
              value={formValues.password}
              onChange={handleChange}
              type="password"
              className="phone-input"
              required
            />
            <div className="label-margin-login">
              <label>Confirm Password</label>
            </div>
            <input
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              minLength={6}
              className="phone-input"
              required
            />
            <div className="error-msg">
              {errorPassword ? errorPassword : error}
            </div>
            <button className="welcome-button1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </center>
    </>
  );
};

export default ResetNewPassword;
