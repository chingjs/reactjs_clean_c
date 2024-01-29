import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../../redux/actions/adminActions';
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

const CategoryReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }// eslint-disable-next-line
  // }, [])
  const [submit, setSubmit] = useState(false)
  const { categoryList, categoryType, locationType } = useSelector((state) => state.adminReducer);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category: '',
    location: '',
  })
  const [typeList, setTypeList] = useState({ options: [], loading: false });
  const [locationList, setLocationList] = useState({ options: [], loading: false });

  useEffect(() => {
    if (!categoryList.length && !submit) {
      dispatch(getAllCategory());
    }
    // eslint-disable-next-line
  }, [categoryList, submit]);

// console.log(categoryList);

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
    key: 'oid',
  },
  {
    label: 'Category',
    key: 'category',
  },
  {
    label: 'Qty',
    key: 'quantity',
  },
  {
    label: 'Total Amount',
    key: 'price',
  },
  // {
  //   label: 'Refund Amount',
  //   key: 'refundAmount',
  // },
  // {
  //   label: 'Total Amount',
  //   key: 'totalAmount',
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
        field: 'location',
        label: 'Location',
        key: 'location',
      },
      {
        field: 'oid',
        label: 'Order ID',
        key: 'oid',
      },
      {
        field: 'category',
        label: 'Category',
        key: 'category',
      },
      {
        field: 'quantity',
        label: 'Qty',
        key: 'quantity',
      },
      {
        field: 'price',
        label: 'Total Amount',
        key: 'price',
      },
      // {
      //   field: 'refundAmount',
      //   label: 'Refund Amount',
      //   key: 'refundAmount',
      // },
      // {
      //   field: 'totalAmount',
      //   label: 'Total Amount',
      //   key: 'totalAmount',
      // },
    ],
    rows:
      categoryList &&
      categoryList.map((data) => {
        return {
          ...data,
          quantity: data.quantity - data.totalCancelQty,
          category: data.serviceType,
          total: ((data.qty * data.price) - (data.totalCancelAmount * data.totalCancelQty)).toFixed(2),
          price: (data.price - data.totalCancelAmount).toFixed(2),
          date: data.date === 'Total' ? data.date : moment(new Date(data.createdAt)).format('YYYY/MM/DD HH:mm'),
          // totalAmount: ((data.qty * data.price) - data.refundAmount)
        };
      })
  }
  useEffect(() => {
    if (categoryType && !submit) {
      setTypeList({ options: categoryType, loading: true });
      setLocationList({ options: locationType, loading: true });
      setFilter({ ...filter, category: [], location: [] })

      setSubmit(true)
    }  // eslint-disable-next-line
  }, [categoryType, submit,locationType]);

  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getAllCategory(filter));
  }

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Category Report</p>

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
          onChange={(e, a) => setFilter({ ...filter, category: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Category" />
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
      <CSVLink className='exportButton' data={data.rows} filename={"category.csv"} headers={headers}>
        EXPORT
      </CSVLink>
      <MDBDataTable
        striped
        info={false}
        bordered
        style={{ textAlign: 'right' }}
        small
        hover
        data={data}
        noBottomColumns
      />
    </div >
  );
};

export default CategoryReport;
