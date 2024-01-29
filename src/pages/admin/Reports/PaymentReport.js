import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPayment, getMDR, getLocationList } from '../../../redux/actions/adminActions';
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

const PaymentReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   } // eslint-disable-next-line
  // },[])
  const [submit, setSubmit] = useState(false)
  const { paymentList, paymentType, MDRList, locationList } = useSelector((state) => state.adminReducer);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    type: '',
    location: '',
  })

  const locationOpt = locationList.map(option => option.location);
  const [typeList, setTypeList] = useState({ options: [], loading: false });
  useEffect(() => {
    if (!paymentList.length && !submit) {
      dispatch(getAllPayment());
      dispatch(getMDR());
      dispatch(getLocationList());
    }
    // eslint-disable-next-line
  }, [paymentList, submit]);

  const headers = [{
    label: 'Date',
    key: 'date',
  },
  {
    label: 'Location',
    key: 'location',
  },
  {
    label: 'Order ID',
    key: 'orderId',
  },
  {
    label: 'Payment Method',
    key: 'method',
  },
  {
    label: 'Payments',
    key: 'payment',
  },
  {
    label: 'Payment Amount',
    key: 'amount',
  },
  {
    label: 'Fees',
    key: 'fees',
  },
  {
    field: 'feesAmt',
    label: 'Fees Amount',
    key: 'feesAmt',
  },
  {
    label: 'Net Total',
    key: 'netTotal',
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
        field: 'location',
        label: 'Location',
        key: 'location',
      },
      {
        field: 'orderId',
        label: 'Order ID',
        key: 'orderId',
      },
      {
        field: 'method',
        label: 'Payment Method',
        key: 'method',
      },
      {
        field: 'amount', 
        label: 'Payment Amount',
        key: 'amount',
      },
      {
        field: 'fees',
        label: 'Fees (%)',
        key: 'fees',
      },
      {
        field: 'feesAmt',
        label: 'Fees Amount',
        key: 'feesAmt',
      },
      {
        field: 'netTotal',
        label: 'Net Total',
        key: 'netTotal',
      },
    ],
    rows:
      paymentList &&
      paymentList.map((data) => {

        let dataRate = MDRList.length ? MDRList.filter(a => a.name === data.method)[0]?.rate : 0
        let dataMin = MDRList.length ? MDRList.filter(a => a.name === data.method)[0]?.min : 0
        let dataFixed = MDRList.length ? MDRList.filter(a => a.name === data.method)[0]?.fixed : 0
        let dataAmt = data.amount / 100
        let dataFees = parseFloat(dataAmt) * parseFloat(dataRate) / 100
        return {
          ...data,

          orderId: data.oid,
          fees: data.date === 'Total' ? '' : dataMin < dataAmt ? dataRate : 'Fixed',
          feesAmt: dataMin < dataAmt ? dataFees.toFixed(2) : dataFixed ? dataFixed : 0,
          // netTotal: dataMin < dataAmt ? dataFees : dataAmt + dataMin,
          netTotal: dataMin < dataAmt ? (dataAmt - dataFees).toFixed(2) : (dataAmt - (dataFixed ? dataFixed : 0)).toFixed(2),
          amount: dataAmt,
          date: data.date === 'Total' ? data.date : moment(new Date(data.createdAt)).format('YYYY/MM/DD HH:mm'),
          payment: data.payment ? 'YES' : 'NO', // 10
        };
      })
  }

  // console.log(paymentList)

  useEffect(() => {
    if (paymentType && !submit) {
      setTypeList({ options: paymentType, loading: true });
      setSubmit(true)
    }    // eslint-disable-next-line
  }, [paymentType, submit]);

  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getAllPayment(filter));
  }

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Payment Method Report</p>

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
        <Autocomplete
          multiple
          options={typeList.options}
          getOptionLabel={(option) => option}
          onChange={(e, a) => setFilter({ ...filter, type: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Payment Method" />
          )}
        />
        {' '}
        <Autocomplete
          multiple
          options={locationOpt}
          // getOptionLabel={(option) => option}
          onChange={(e, a) => setFilter({ location: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        {' '}
        <Button variant="outlined" style={{ marginTop: '10px', height: '53px', width: '460px' }} onClick={(e) => goFilter(e)}>Filter</Button>
      </center>
      <CSVLink className='exportButton' data={data.rows} filename={"payments.csv"} headers={headers}>
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

export default PaymentReport;
