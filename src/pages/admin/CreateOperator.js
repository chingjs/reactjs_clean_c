import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createOperator, verifyToken } from '../../redux/actions/adminActions';
import { Paper, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateOperator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, [])
  const paperStyle = { padding: '30px 20px', width: 500, margin: "130px auto" }
  const [operatorData, setOperatorData] = useState({
    phone_number: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    email: '',
  });
  const { message, error, admin } = useSelector((state) => state.adminReducer);
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      ...operatorData,
      adminName: admin && admin.name,
    }
    dispatch(createOperator(sendData));
  };

  useEffect(() => {
    dispatch((clearError))
    if (admin) {
    } // eslint-disable-next-line
  }, [admin])
  return (
    <div>
      <Header />
      <br />
      <br />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <h2 style={headerStyle}>Create New Driver</h2>
            <br />
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth required value={operatorData.full_name}
              onChange={(e) => setOperatorData({ ...operatorData, full_name: e.target.value })} pattern="^(\+?6?01)[0-46-9]-*[0-9]{7,8}$" label='Full Name' placeholder="Enter the name" />
            <br />
            <br />
            <TextField fullWidth value={operatorData.email}
              onChange={(e) => setOperatorData({ ...operatorData, email: e.target.value })} label='Email' type='email' placeholder="Enter the email (Optional)" />
            <br />
            <br />
            <TextField fullWidth required value={operatorData.phone_number}
              onChange={(e) => setOperatorData({ ...operatorData, phone_number: e.target.value })} label='Phone Number' placeholder="Enter the phone number" />
            <br />
            <br />
            <TextField fullWidth required value={operatorData.password}
              onChange={(e) => setOperatorData({ ...operatorData, password: e.target.value })} minLength={6} type='password' label='Password' placeholder="Enter password" />
            <br />
            <br />
            <TextField fullWidth required value={operatorData.confirmPassword}
              onChange={(e) => setOperatorData({ ...operatorData, confirmPassword: e.target.value })} type='password' label='Confirm Password' placeholder="Confirm password" />
            <p />
            <center>
              <div className="admin-error">{message ? <div className="admin-success-msg">{message} </div> : error}</div>
            </center>
            {message ? '' : <button type='submit' className="admin-create-input" variant='contained' >Create</button>}
          </form>
        </Paper>
      </Grid>
    </div >
  );
};

export default CreateOperator;
