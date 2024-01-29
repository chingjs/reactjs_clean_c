import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItem } from '../../../redux/actions/adminActions';
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
  //   }// eslint-disable-next-line
  // }, [])
  const [submit, setSubmit] = useState(false)
  const { itemList, itemType, locationType } = useSelector((state) => state.adminReducer);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    item: '',
    location: '',
  })
  const [typeList, setTypeList] = useState({ options: [], loading: false });
  const [locationList, setLocationList] = useState({ options: [], loading: false });

  useEffect(() => {
    if (!itemList.length && !submit) {
      dispatch(getAllItem());
    }
    // eslint-disable-next-line
  }, [itemList, submit]);

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
    key: 'orderNo',
  },
  {
    label: 'Category',
    key: 'category',
  },
  {
    label: 'Item',
    key: 'item',
  },
  {
    label: 'Qty',
    key: 'qty',
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Total',
    key: 'total',
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
        field: 'orderNo',
        label: 'Order ID',
        key: 'orderNo',
      },
      {
        field: 'category',
        label: 'Category',
        key: 'category',
      },
      {
        field: 'item',
        label: 'Item Name',
        key: 'item',
      },
      {
        field: 'qty',
        label: 'Qty',
        key: 'qty',
      },
      {
        field: 'price',
        label: 'Price',
        key: 'price',
      },
      {
        field: 'total',
        label: 'Total',
        key: 'total',
      },
    ],
    rows:
      itemList &&
      itemList.map((data) => {
        return {
          ...data,
          total: data.total ? data.total.toFixed(2) : 0,
          price: data.price.toFixed(2),
          date: data.date === 'Total' ? data.date : moment(new Date(data.createdAt)).format('YYYY/MM/DD HH:mm'),
        };
      })
  }

  useEffect(() => {
    if (itemType && !submit) {
      setTypeList({ options: itemType, loading: true });
      setLocationList({ options: locationType, loading: true });
      setFilter({ ...filter, item: [], location: [] })

      setSubmit(true)
    }    // eslint-disable-next-line
  }, [itemType, submit]);

  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getAllItem(filter));
  }

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Item Type Report</p>

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
          onChange={(e, a) => setFilter({ ...filter, item: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Item Name" />
          )}
        />
        {' '}
        <Autocomplete
          multiple
          options={locationList.options}
          getOptionLabel={(option) => option}
          onChange={(e, a) => setFilter({ ...filter, location: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Location" />
          )}
        />
        {' '}
        <Button variant="outlined" style={{ marginTop: '10px', height: '53px', width: '460px' }} onClick={(e) => goFilter(e)}>Filter</Button>
      </center>
      <CSVLink className='exportButton' data={data.rows} filename={"items.csv"} headers={headers}>
        EXPORT
      </CSVLink>
      <MDBDataTable
        striped
        bordered
        info={false}
        style={{ textAlign: 'right' }}
        small
        hover
        data={data}
        noBottomColumns
      />
    </div >
  );
};

export default PaymentReport;
