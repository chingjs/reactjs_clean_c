import React, { useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, getUserReport } from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";

const UserPerformance = () => {
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
  const { userReport } = useSelector((state) => state.adminReducer);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    dispatch(getUserReport());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userReport && userReport.length) {
      setPerformance(userReport);
    }
    // eslint-disable-next-line
  }, [userReport]);

  const headers = [
    {
      field: 'cid',
      label: 'Customer ID',
      key: 'cid'
    },
    {
      field: 'full_name',
      label: 'Name',
      key: 'full_name'
    },
    {
      field: 'phone_number',
      label: 'Number',
      key: 'phone_number'
    },
    {
      field: 'createdDate',
      label: 'Join Date',
      key: 'createdDate'
    },
    {
      field: 'email',
      label: 'Email',
      key: 'email'
    },
    {
      field: 'totalSpent',
      label: 'Total Spend (RM)',
      key: 'totalSpent'
    },
    {
      field: 'preferable',
      label: 'Most Prefered Service',
      key: 'preferable'
    },
    {
      field: 'totalGarment',
      label: 'Garment',
      key: 'totalGarment'
    },
    {
      field: 'totalHousehold',
      label: 'Household',
      key: 'totalHousehold'
    },
    {
      field: 'totalShoe',
      label: 'Shoe',
      key: 'totalShoe'
    },
    {
      field: 'totalLaundry',
      label: 'Laundry',
      key: 'totalLaundry'
    },
  ]

  const data = {
    columns:
      [
        {
          field: 'cid',
          label: 'Customer ID',
          key: 'cid'
        },
        {
          field: 'full_name',
          label: 'Name',
          key: 'full_name'
        },
        {
          field: 'phone_number',
          label: 'Number',
          key: 'phone_number'
        },
        {
          field: 'createdDate',
          label: 'Join Date',
          key: 'createdDate'
        },
        {
          field: 'email',
          label: 'Email',
          key: 'email'
        },
        {
          field: 'totalSpent',
          label: 'Total Spend (RM)',
          key: 'totalSpent'
        },
        {
          field: 'preferable',
          label: 'Most Prefered Service',
          key: 'preferable'
        },
        {
          field: 'totalGarment',
          label: 'Garment',
          key: 'totalGarment'
        },
        {
          field: 'totalHousehold',
          label: 'Household',
          key: 'totalHousehold'
        },
        {
          field: 'totalShoe',
          label: 'Shoe',
          key: 'totalShoe'
        },
        {
          field: 'totalLaundry',
          label: 'Laundry',
          key: 'totalLaundry'
        },
      ],

    rows:
      performance &&
      performance.map((data) => {
        return {
          ...data,
          totalSpent: parseFloat(data.totalSpent),
          preferable: data.serviceList.total !== 0 ? data.serviceList.name : '-',
          createdDate: moment(new Date(data.createdAt)).format('YYYY/MM/DD'),
        };
      })
  }

  return (
    <div style={{ padding: '1%'}}>
      <br />
      <br />
      <Header />
      <br />
      <br />
      <CSVLink className='exportButton' data={data.rows} filename={"UserPerformance.csv"} headers={headers}>
        EXPORT
      </CSVLink>
      <MDBDataTable
        striped
        bordered
        info={false}
        small
        hover
        data={data}
        noBottomColumns
      />
    </div>
  );
};

export default UserPerformance;
