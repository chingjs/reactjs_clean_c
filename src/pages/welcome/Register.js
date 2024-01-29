import backArrow from '../../assets/images/back-arrow.png';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import { registerUser, clearError } from '../../redux/actions/userActions';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
// import en from 'react-phone-number-input/locale/en.json';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Register = () => {
  const history = useNavigate();
  const initialValues = {
    phone_number: '',
    password: '',
    full_name: '',
    email: '',
    verified: false,
    country: '60',
    operatorCode: localStorage.getItem('operatorId'),
  };

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [submit, setSubmit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { message, error } = useSelector((state) => state.userReducer);
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
    const newPhone = formValues.country + formValues.phone_number
    localStorage.setItem('customer_phone', newPhone);

    setSubmit(true);
    setIsClicked(true);
    dispatch(registerUser(formValues));
  };


  useEffect(() => {

    if (isClicked && error) {
      setErr(error);
    }
    else {
      setIsClicked(false)
    }
    dispatch(clearError());
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (message && submit) {
      const newPhone = formValues.country + formValues.phone_number
      history(`/customer/otp/verify/${newPhone}`, {
        state: newPhone,
      });
    }
    // eslint-disable-next-line
  }, [message, submit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBack = () => {
    history('/customer/welcome');
  };

  const handlePhoneNumberChange = (value, country) => {
    const trimmedPhoneNumber = value.slice(country.dialCode.length).trim();
    setFormValues({ ...formValues, country: country.dialCode, phone_number: trimmedPhoneNumber });
  };

  return (
    <>
      <div className="register-arrowback">
        <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
      </div>
      <div className="register-word1">
        <p>Create an Account</p>
      </div>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="marginTop-login-form">
            <div className="label-margin-login">
              <label>Phone</label>
            </div>
            <div style={{ textAlign: "center" }}>
              <PhoneInput
                country="my"
                value={formValues.phoneNumber}
                onChange={handlePhoneNumberChange}
                specialLabel={""}
                enableSearch={true}
                dropdownStyle={{ height: '150px' }}
                inputStyle={{ color: 'black' }}
                // countryCodeEditable={false}
              />
            </div>
            <div className="label-margin-login">
              <label>Password</label>
            </div>
            <input
              name="password"
              minLength={6}
              value={formValues.password}
              onChange={handleChange}
              type={passwordShown ? "text" : "password"}
              className="phone-input"
              required
            />
            <icon className="phone-input-password" onClick={() => setPasswordShown(!passwordShown)} >{passwordShown ? <Visibility /> : <VisibilityOffIcon />}</icon>
            <div className="label-margin-login">
              <label>Name</label>
            </div>
            <input
              name="full_name"
              value={formValues.full_name}
              onChange={handleChange}
              className="phone-input"
              required
            />
            <div className="label-margin-login">
              <label>Email</label>
            </div>
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              type="email"
              className="phone-input"
              required
            />
            <div className="tnc-content">

              {/* <input style={{ marginLeft: '7%' }} required type="checkbox" value={tnc} onChange={(e) => setTNC(!tnc)} /> */}
              <div className="register-tnc">
                By signing up, you agree to our  <a style={{ textDecoration: 'underline' }}
                  href="https://mrjs.com.my/terms-of-service/"> Terms and Conditions
                </a> and
                <a style={{ textDecoration: 'underline' }}
                  href="https://mrjs.com.my/privacy-policy/"> Privacy Policy
                </a>
              </div>
            </div>
            {<div className="error-msg">{err}</div>}
            <div className="phone-input">

              {/* Edit here */}
              <button className="reg-button1" type="submit" disabled={isClicked}>
                Create
                {/* {isClicked ? "Processing..." : "Click Me"}testing */}
              </button>
            </div>
            <br />
            <div className="phone-input">
              <div className="signup-bottom">
                Already have an account? {''}
                <a href="/customer/login">Sign in</a>
              </div>
            </div>
          </div>
        </form>
      </center>
    </>
  );
};

export default Register;
