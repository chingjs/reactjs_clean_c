import './admin.css';

import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLogo from '../../assets/admin/AppLogo.png';
import { loginAdmin } from '../../redux/actions/adminActions';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const { error } = useSelector((state) => state.adminReducer);
  const token = localStorage.getItem('adminToken');
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const goHome = (e) => {
    e.preventDefault();
    navigate('/admin/home');
    // dispatch(loginAdmin(data));
    setSubmit(true);
  };

  // useEffect(() => {
  //   if (token && submit) {
  //     navigate('/admin/home');
  //   } else {
  //     localStorage.removeItem('adminToken');
  //   }
  //   // eslint-disable-next-line
  // }, [token, submit]);
  return (
    <>
      <div className="admin-login-full">
        <div className="admin-login-bg">
          <br />
          <form onSubmit={goHome}>
            <Grid container direction="row">
              <Grid item style={{ width: '100%' }}>
                <Grid align="center">
                  <img src={AppLogo} alt="AppLogo" />
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid>
                  <h1 className="admin-login-word1">Login Page</h1>
                </Grid>
                <Grid>
                  <TextField
                    style={{ width: '50%', margin: '20px 25%' }}
                    label="Username"
                    placeholder="Enter username"
                    fullWidth
                    required
                    value={data.username}
                    onChange={(e) =>
                      setData({
                        ...data,
                        username: e.target.value,
                      })
                    }
                  />
                  <TextField
                    style={{ width: '50%', margin: '20px 25%' }}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({
                        ...data,
                        password: e.target.value,
                      })
                    }
                    fullWidth
                    required
                  />
                  {<div className="admin-error">{error}</div>}
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: '50%', margin: '20px 25%' }}
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
