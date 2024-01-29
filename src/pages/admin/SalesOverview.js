import React, { useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import SalesChart from './Components/SalesChart';
import {
  getOverview,
  getLockerSummary,
  getServiceRank,
} from '../../redux/actions/adminActions';
import './admin.css';
import { useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Button } from '@mui/material';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';

const SalesOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   // console.log('check')
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }// eslint-disable-next-line
  // }, [])
  const { overview, serviceRank } = useSelector(
    (state) => state.adminReducer
  );
  const [submit, setSubmit] = useState(false);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getServiceRank(filter));
    dispatch(getOverview(filter));
  }
  const todayAmount = overview.map((d => { return d.amount })).reduce((a, b) => a + b, 0);
  const todayOrder = overview.map((d => { return d.transactions })).reduce((a, b) => a + b, 0);
  useEffect(() => {
    if (!overview.length && !submit) {
      dispatch(getServiceRank(filter));
      dispatch(getOverview(filter));
      dispatch(getLockerSummary());
      setSubmit(true)
    }
    // eslint-disable-next-line
  }, [overview, serviceRank, submit]);
  const data = {
    columns: [
      {
        field: 'index',
        label: 'Rank',
      },
      {
        field: 'name',
        label: 'Item Category',
      },
      {
        field: 'transactions',
        label: 'Total Orders',
      },
      {
        field: 'amount',
        label: 'Total Sales',
      }
    ],
    rows:
      serviceRank && serviceRank.map((data, i) => {
        return {
          ...data,
          index: i + 1,

        };
      })
  }


  return (
    <>
      <div className="overview-appBar">
        <Header />
      </div>
      <br />
      <br />
      <br />
      <div>

        <div className="app-container">
          <table className="overview-table">
            <thead>
              <tr key="1">
                <th className="locker-td">Subtotal</th>
                <th className="locker-td">Total SST</th>
                <th className="locker-td">Total Sales (Incl SST)</th>
                <th className="locker-td">Total Order</th>
                <th className="locker-td">Top Sales Locker</th>
              </tr>
            </thead>
            <tbody>
              <tr key="2">
                <td className="locker-td">RM {todayAmount.toFixed(2)}</td>
                <td className="locker-td">RM {(todayAmount * 0.06).toFixed(2)}</td>
                <td className="locker-td">RM {todayAmount ? (todayAmount + todayAmount * 0.06).toFixed(2) : '0'}</td>
                <td className="locker-td">{todayOrder}</td>
                <td className="locker-td">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <center>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={filter.startDate}
              onChange={(newValue) => {
                setFilter({ ...filter, startDate: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            /> {" "}
            <DatePicker
              style={{ fontSize: '10px' }}
              label="End Date"
              value={filter.endDate}
              onChange={(newValue) => {
                setFilter({ ...filter, endDate: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {' '}
          <Button variant="outlined" style={{ height: '53px', }} onClick={(e) => goFilter(e)}>Filter</Button>
        </center>
        <div style={{ width: '65%', marginTop: '1%', marginLeft: '17%' }}>
          <SalesChart
            chartData={{
              labels: overview && overview.map((data) => data.date),
              datasets: [
                {
                  label: 'Total Order',
                  data: overview && overview.map((data) => data.transactions),
                  fill: true,
                  borderColor: 'blue',
                  tension: 0.3,
                },
                {
                  label: 'Total Amount',
                  data: overview && overview.map((data) => data.amount),
                  fill: true,
                  borderColor: 'red',
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>
        <br />
        <div className="overview-container">
          <center>
            <h3>Sales By Item Category</h3>
          </center>
          <MDBDataTable
            striped
            bordered
            info={false}
            small
            hover
            noBottomColumns
            data={data} />
        </div>
      </div>
    </>
  );
};

export default SalesOverview;
