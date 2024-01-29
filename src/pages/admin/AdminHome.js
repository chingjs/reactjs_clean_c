import React, { useEffect } from 'react';
import Header from './Layout/Header';
import Home from '../../assets/admin/home.png';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }// eslint-disable-next-line
  // }, [])

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <center>
        <h1 className="admin-home-word1">Welcome</h1>
        <img src={Home} alt="home" height="250" width="250" />
      </center>
    </div>
  );
};

export default AdminHome;
