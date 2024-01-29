import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRefund, getLocationList } from '../../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { CSVLink } from "react-csv";
import '../admin.css'
import { TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

const RefundReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const adminCheck = localStorage.getItem('adminToken');
    if (!adminCheck) {
      navigate('/admin/login')
    } // eslint-disable-next-line
  }, [])
  const [submit, setSubmit] = useState(false)
  const { refundList, locationList } = useSelector((state) => state.adminReducer);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    type: '',
    location: '',
  })
  const [list, setList] = useState({ options: [], loading: false });

  // const [typeList, setTypeList] = useState({ options: [], loading: false });
  useEffect(() => {
    if (!refundList.length && !submit) {
      dispatch(getAllRefund());
      dispatch(getLocationList());
      // setList({ options: locationList.map(a => a.location), loading: true })
    }
    // eslint-disable-next-line
  }, [refundList, submit]);

  useEffect(() => {
    if (refundList.length) {
      setList({ options: locationList.map(a => a.location), loading: true })
      setFilter({ ...filter, location: locationList.map(a => a.location) })
    }
    
    // eslint-disable-next-line
  }, [locationList]);

  const headers = [
    {
      label: 'Date',
      key: 'date',
    },
    {
      label: 'Order ID',
      key: 'orderId',
    },
    {
      field: 'location',
      label: 'Location',
      key: 'locaton',
    },
    {
      label: 'Method',
      key: 'method',
    },
    {
      label: 'Refund Amount (RM)',
      key: 'amount',
    },
    {
      field: 'reason',
      label: 'Reason',
      key: 'reason',
    },
    {
      label: 'Refund By',
      key: 'refundBy',
    },
  ]

  const data = {
    columns: [
      {
        field: 'date',
        label: 'Date',
        key: 'date',
        sort: 'asc',
      },
      {
        field: 'orderId',
        label: 'Order ID',
        key: 'orderId',
      },
      {
        field: 'location',
        label: 'Location',
        key: 'locaton',
      },
      {
        field: 'method',
        label: 'Method',
        key: 'method',
      },
      {
        field: 'amount',
        label: 'Refund Amount (RM)',
        key: 'amount',
      },
      {
        field: 'reason',
        label: 'Reason',
        key: 'reason',
      },
      {
        field: 'refundBy',
        label: 'Refund By',
        key: 'refundBy',
      },
    ],
    rows:
      refundList &&
      refundList.map((data) => {
        return {
          ...data,
          orderId: data.charge?.oid,
          method: data.charge?.action.toUpperCase(),
          amount: data.refundAmount,
          date: data.date === 'Total' ? data.date : moment(new Date(data.createdAt)).format('YYYY/MM/DD HH:mm'),
          reason: data.charge?.reason,
          refundBy: data.charge?.admin?.username.toUpperCase(),
          location: data.charge?.order.location
        };
      })
  }

  // console.log(refundList[0]?.charge?.order.location)

  useEffect(() => {
    if (!submit) {
      setSubmit(true)
    }

  }, [submit]);

  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getAllRefund(filter));
  }

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Refund Report</p>
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
        <Autocomplete
          multiple
          options={list.options}
          getOptionLabel={(option) => option}
          onChange={(e, a) => {
            setFilter({ ...filter, location: a })
          }}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Location" />
          )}
        />
        <Button variant="outlined" style={{ marginTop: '10px', height: '53px', width: '460px' }} onClick={(e) => goFilter(e)}>Filter</Button>
      </center>
      <CSVLink className='exportButton' data={data.rows} filename={"refund.csv"} headers={headers}>
        EXPORT
      </CSVLink>
      <MDBDataTable
        striped
        info={false}
        style={{ textAlign: 'right' }}
        bordered
        small
        hover
        data={data}
        noBottomColumns
      />
    </div >
  );
};

export default RefundReport;
