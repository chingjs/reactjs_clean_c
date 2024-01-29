import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, getAllSalesSummary, getLocationList } from '../../../redux/actions/adminActions';
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

const SalesSummaryReport = () => {
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
  const { salesSummaryList, admin, location, locationList } = useSelector((state) => state.adminReducer);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    type: 'Daily',
    location: '',
    name: '',
  })

  // console.log(salesSummaryList)

  const [start, setStart] = useState(false)
  const [list, setList] = useState({ options: [], loading: false });

  useEffect(() => {
    if (admin && admin.name === 'admin') {
      setList({ options: locationList.map(a => a.location), loading: true })
      setFilter({ ...filter, location: locationList.map(a => a.location) })
    }
    else {
      // console.log('other', location)
      setList({ options: location, loading: true })
      setFilter({ ...filter, location: location })

    }
    // eslint-disable-next-line
  }, [location, admin, locationList]);

  useEffect(() => {
    if (!start) {
      const sendData = {
        startDate: '',
        endDate: '',
        type: 'Daily',
        name: admin && admin.name,
      }
      dispatch(getAllSalesSummary(sendData));
      if (!locationList.length) {
        dispatch(getLocationList());
      }
    }
    // eslint-disable-next-line
  }, [admin]);
  const headers = [{
    label: 'date',
    key: 'date',
  },
  {
    label: 'Quantity',
    key: 'qty',
  },
  {
    label: 'Location',
    key: 'olocation',
  },
  // {
  //   label: 'Subtotal',
  //   key: 'subtotal',
  // },
  {
    label: 'Discount',
    key: 'discount',
  },
  {
    label: 'Total Sales',
    key: 'subtotal',
  },
  {
    label: 'Tax',
    key: 'tax',
  },
  {
    label: 'Net Total',
    key: 'netTotal',
  },
    // {
    //   label: 'Payment Amount',
    //   key: 'paymentAmount',
    // },
    // {
    //   label: 'Fees',
    //   key: 'fees',
    // },
    // {
    //   label: 'Payment Net Total',
    //   key: 'paymentNetTotal',
    // },
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
        field: 'orders',
        label: 'Orders',
        key: 'orders',
      },
      {
        field: 'olocation',
        label: 'Location',
        key: 'olocation',
      },
      {
        field: 'qty',
        label: 'Quantity',
        key: 'qty',
      },
      // {
      //   field: 'discount',
      //   label: 'Discount',
      //   key: 'discount',
      // },
      {
        field: 'subtotal',
        label: 'Total Sales',
        key: 'subtotal',
      },
      {
        field: 'totalDiscount',
        label: 'Discount Total',
        key: 'totalDiscount',
      },
      {
        field: 'tax',
        label: 'Tax',
        key: 'tax',
      },
      {
        field: 'netTotal',
        label: 'Net Total',
        key: 'netTotal',
      },
      // {
      //   field: 'paymentAmount',
      //   label: 'Payment Amount',
      //   key: 'paymentAmount',
      // },
      // {
      //   field: 'fees',
      //   label: 'Fees',
      //   key: 'fees',
      // },
      // {
      //   field: 'paymentNetTotal',
      //   label: 'Payment Net Total',
      //   key: 'paymentNetTotal',
      // },
    ],
    rows: salesSummaryList.map((data) => {
      // console.log(data);
      let discountAmount = data.discount_total ? data.discount_total : 0;
      let discountOriginalAmount = data.discount_code_amount ? data.discount_code_amount : 0;
      let tax = ((data.subtotal - discountAmount) * 0.06).toFixed(2);
      let netTotal = ((data.subtotal - discountAmount) + (data.subtotal - discountAmount) * 0.06).toFixed(2);
      // console.log(netTotal)
      return {
        ...data,
        date: data.date !== 'Total' ? start ? filter.type === 'Weekly' ? `${moment(data.date).format('YYYY/MM/DD')} - ${moment(data.date).add(6, 'days').format('YYYY/MM/DD')}`
          : filter.type === 'Monthly' ? `${moment(data.date).format('YYYY/MM/DD')} - ${moment(new Date(new Date(data.date).getFullYear(), new Date(data.date).getMonth() + 1, 0)).format('YYYY/MM/DD')
            }`
            : filter.type === 'Yearly' ? `${moment(data.date).format('YYYY/MM/DD')} - ${moment(new Date(new Date(data.date).getFullYear(), 12, 0)).format('YYYY/MM/DD')
              }` : moment(data.date).format('YYYY/MM/DD') : moment(data.date).format('YYYY/MM/DD') : data.date,
        subtotal: data.subtotal ? data.subtotal.toFixed(2) : 0,
        totalDiscount: (discountOriginalAmount).toFixed(2),
        netTotal: netTotal,
        tax: tax ,
        // discount: 0,
        // date: moment(new Date(data.date)).format('YYYY/MM/DD'),
      }
    })
  }

  const goFilter = (e) => {
    e.preventDefault();
    const sendData = {
      ...filter, name: admin && admin.name,
    }
    dispatch(getAllSalesSummary(sendData));
    setStart(true)
    // salesSummaryList.map((data) => {
    //   return {
    //     ...data,
    //     date: filter.type === 'Weekly' ? `${data.date} - ${moment(data.date).add(6, 'days').format('YYYY-MM-DD')}`
    //       : filter.type === 'Monthly' ? `${data.date} - ${moment(new Date(new Date(data.date).getFullYear(), new Date(data.date).getMonth() + 1, 0)).format('YYYY-MM-DD')
    //         }`
    //         : filter.type === 'Yearly' ? `${data.date} - ${moment(new Date(new Date(data.date).getFullYear(), 12, 0)).format('YYYY-MM-DD')
    //           }` : data.date,
    //   }
    // })

  }
  const summaryType = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Sales Summary Report</p>

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
          options={summaryType}
          getOptionLabel={(option) => option}
          onChange={(e, a) => {
            setStart(false)
            setFilter({ ...filter, type: a })
          }}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Filter Type" />
          )}
        />
        <Autocomplete
          multiple
          options={list.options}
          getOptionLabel={(option) => option}
          onChange={(e, a) => {
            setStart(false)
            setFilter({ ...filter, location: a })
          }}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Location" />
          )}
        />
        {' '}
        <Button variant="outlined" style={{ marginTop: '10px', height: '53px', width: '460px' }} onClick={(e) => goFilter(e)}>Filter</Button>
      </center>
      <CSVLink className='exportButton' data={data.rows} filename={"salessummary.csv"} headers={headers}>
        EXPORT
      </CSVLink>
      <MDBDataTable
        style={{ textAlign: 'right' }}
        striped
        bordered
        small
        hover
        info={false}
        data={data}
        noBottomColumns
      />
    </div >
  );
};

export default SalesSummaryReport;
