import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './admin.css';

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  getAllOrder,
  getLocationList,
  verifyToken,
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { CSVLink } from 'react-csv';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from './Layout/Header';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MDBDataTable } from 'mdbreact';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import OrderEditModal from './OrderEditModal';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // height:'80vh',
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  border: '15px solid white',
  // boxShadow: 24,
  // p: 2,
};

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login');
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, []);
  const [orderData, setOrderData] = useState();
  const { order, admin, location, locationList } = useSelector(
    (state) => state.adminReducer
  );
  const [status, setStatus] = useState('active');
  const [view, setView] = useState(false);
  // const [submit, setSubmit] = useState(false);
  const [viewImg, setViewImg] = useState();
  const locationOpt = locationList.map((option) => option.location);

  // console.log(order);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: new Date(),
    location: [],
    status: 'active',
  });

  useEffect(() => {
    if (admin && admin.name) {
      const sendData = {
        ...filter,
        name: admin && admin.name,
        location: location,
      };
      dispatch(getAllOrder(sendData));
      dispatch(getLocationList());
    } 
     // eslint-disable-next-line
  }, [admin]);

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
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Phone',
      key: 'phone_number',
    },
    {
      label: 'Location',
      key: 'location',
    },
    {
      label: 'Item category',
      key: 'serviceType',
    },
    {
      label: 'Qty',
      key: 'quantity',
    },
    {
      label: 'Deposit Locker ID',
      key: 'lockerId',
    },
    {
      label: 'Customer Drop Off Date',
      key: 'depositTime',
    },
    {
      label: 'Pick Up Driver',
      key: 'pick_up_driver',
    },
    {
      label: 'Driver Picked Up Date',
      key: 'pick_up_time',
    },
    {
      label: 'Customer Chosen Collection Date',
      key: 'pick_up_date',
    },
    {
      label: 'Collect Locker ID',
      key: 'collectLockerId',
    },
    {
      label: 'Drop Off Driver',
      key: 'delivery_driver',
    },
    {
      label: 'Driver Dropped Off Date',
      key: 'delivered_time',
    },
    {
      label: 'Customer Picked Up Date',
      key: 'collectedDate',
    },
    {
      label: 'Discount Code',
      key: 'code',
    },
    {
      label: 'SubTotal',
      key: 'subtotal',
    },
    {
      label: 'Discounted Amount',
      key: 'discountTotal',
    },
    {
      label: 'Cancelled Amount',
      key: 'canceltotal',
    },
    {
      label: 'SST',
      key: 'sst',
    },

    {
      // field: 'refund',
      label: 'Refund',
      key: 'refund',
    },
    {
      label: 'Total Sales (Incl SST)',
      key: 'price',
    },

    {
      label: 'Payment',
      key: 'payment',
    },
    {
      label: 'Payment Method',
      key: 'paymenttype',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'Note',
      key: 'note',
    },
  ];
  const openView = (e) => {
    setView(true);
    setViewImg(e);
  };
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
        field: 'name',
        label: 'Name',
        key: 'name',
      },
      {
        field: 'phone_number',
        label: 'Phone',
        key: 'phone_number',
      },
      {
        field: 'location',
        label: 'Location',
        key: 'location',
      },
      {
        field: 'serviceType',
        label: <div>Item category</div>,
        key: 'serviceType',
      },
      {
        field: 'quantity',
        label: 'Qty',
        key: 'quantity',
      },
      {
        field: 'images',
        label: 'Images',
        key: 'images',
      },
      {
        field: 'lockerId',
        label: 'Deposit Locker ID',
        key: 'lockerId',
      },
      {
        field: 'depositTime',
        label: <div>Customer Drop Off Date</div>,
        key: 'depositTime',
      },
      {
        field: 'pick_up_driver',
        label: <div>Pick Up Driver </div>,
        key: 'pick_up_driver',
      },
      {
        field: 'pick_up_time',
        label: <div>Driver Picked Up Date</div>,
        key: 'pick_up_time',
      },
      {
        field: 'pick_up_date',
        label: <div>Customer Chosen Collection Date</div>,
        key: 'pick_up_date',
      },
      {
        field: 'collectLockerId',
        label: 'Collect Locker ID',
        key: 'collectLockerId',
      },
      {
        field: 'delivery_driver',
        label: <div>Drop Off Driver</div>,
        key: 'delivery_driver',
      },
      {
        field: 'delivered_time',
        label: <div>Driver Dropped Off Date</div>,
        key: 'delivered_time',
      },
      {
        field: 'collectedDate',
        label: <div>Customer Picked Up Date</div>,
        key: 'collectedDate',
      },
      {
        field: 'code',
        label: 'Discount Code',
        key: 'code',
      },
      {
        field: 'subtotal',
        label: 'SubTotal',
        key: 'subtotal',
      },
      {
        field: 'discountTotal',
        label: 'Discounted Amount',
        key: 'discountTotal',
      },
      {
        field: 'canceltotal',
        label: 'Cancelled Amount',
        key: 'canceltotal',
      },
      {
        field: 'sst',
        label: 'SST',
        key: 'sst',
      },
      {
        field: 'refund',
        label: 'Refund',
        key: 'refund',
      },
      {
        field: 'price',
        label: 'Total Sales (Incl SST)',
        key: 'price',
      },

      {
        field: 'payment',
        label: 'Payment',
        key: 'payment',
      },
      {
        field: 'paymenttype',
        label: 'Payment Method',
        key: 'paymenttype',
      },
      {
        field: 'status',
        label: 'Status',
        key: 'status',
      },
      {
        field: 'note',
        label: 'Note',
        key: 'note',
      },
      {
        field: 'actionEdit',
        label: 'Action',
        key: 'actionEdit',
      },
    ],
    rows:
      order &&
      order.map((data) => {
        // let codeAmount = data.redeemCode ? (data.redeemCode.amount + (data.redeemCode.amount * 0.06)) : 0
        // let totalPrice = (((data.subtotal - data.totalCancelAmount) + ((data.subtotal - data.totalCancelAmount) * 0.06)) - data.refund - codeAmount).toFixed(2);
        // let tax = ((data.subtotal - codeAmount - data.totalCancelAmount) * 0.06).toFixed(2);
        // console.log((data.subtotal - data.totalCancelAmount).toFixed(2))
        let codeAmount = 0;
        let subTotal = data.subtotal.toFixed(2);
        if (data.redeemCode) {
          if (data.redeemCode.type === 'Rate') {
            codeAmount = subTotal * (data.redeemCode.amount / 100);
          } else {
            codeAmount = data.redeemCode.amount;
          }
        }

        let totalPrice =
          subTotal -
          data.totalCancelAmount -
          codeAmount +
          (subTotal - data.totalCancelAmount - codeAmount) * 0.06;
        let tax = (
          (subTotal - codeAmount - data.totalCancelAmount) *
          0.06
        ).toFixed(2);
        let sub = subTotal - codeAmount;
        // console.log(subTotal, codeAmount, totalPrice, tax);

        return {
          ...data,
          subtotal: subTotal,
          canceltotal: data.totalCancelAmount.toFixed(2),
          price: totalPrice > 0 ? totalPrice : 0,
          sst: tax > 0 ? tax : 0,
          orderId: data.oid,
          quantity: data.quantity - data.totalCancelQty,
          discountTotal:
            data.redeemCode && sub > 0
              ? sub.toFixed(2)
              : data.redeemCode && sub < 0
              ? subTotal
              : (0).toFixed(2),
          refund: data.refund.toFixed(2),
          date: moment(new Date(data.createdAt)).format('YYYY/MM/DD'),
          code: data.redeemCode ? data.redeemCode.code : '-',
          status: data.status === 'active' ? 'Active' : 'Completed',
          depositTime:
            format(new Date(data.deposit_time), 'yyyy') !== '1970'
              ? moment(new Date(data.deposit_time)).format('YYYY/MM/DD')
              : '-',
          pick_up_time:
            format(new Date(data.pick_up_time), 'yyyy') === '1970'
              ? '-'
              : moment(new Date(data.pick_up_time)).format('YYYY/MM/DD'),
          delivered_time:
            format(new Date(data.delivered_time), 'yyyy') === '1970'
              ? '-'
              : moment(new Date(data.delivered_time)).format('YYYY/MM/DD'),
          pick_up_date:
            new Date(data.pick_up_date).getFullYear() !== '1970'
              ? moment(new Date(data.pick_up_date)).format('YYYY/MM/DD')
              : '-',
          collectedDate:
            format(new Date(data.collectedDate), 'yyyy') !== '1970'
              ? moment(new Date(data.collectedDate)).format('YYYY/MM/DD')
              : '-',
          payment: data.payment ? 'YES' : 'NO', // 10
          serviceType: data.serviceType,
          pick_up_driver: data.pick_up_driver ? data.pickupRecord : '-',
          delivery_driver: data.delivery_driver ? data.deliveryRecord : '-',
          collectLockerId: data.collectLockerId ? data.collectLockerId : '-',
          images:
            data.images.length &&
            data.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => openView(img)}
                alt=""
                height="70"
                width="auto"
              />
            )),
          actionEdit: (
            <button onClick={(e) => handleModalOpen(data)}>Update</button>
          ),
        };
      }),
  };
  const [editModal, setEditModal] = useState(false);

  const handleModalOpen = (record) => {
    setOrderData(record);
    setEditModal(true);
  };

  const goFilter = (e) => {
    e.preventDefault();
    const sendData = {
      ...filter,
      name: admin && admin.name,
      status: status ? status : 'active',
      // location: location[0] ? location : filter.location
    };
    dispatch(getAllOrder(sendData));
  };

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <br />
      <center>
        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>Order Management</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={filter.startDate}
            onChange={(newValue) => {
              setFilter({ ...filter, startDate: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />{' '}
          <DatePicker
            style={{ fontSize: '10px' }}
            label="End Date"
            value={filter.endDate}
            onChange={(newValue) => {
              setFilter({ ...filter, endDate: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>{' '}
        <Autocomplete
          multiple
          options={locationOpt} // Filter out selected options
          getOptionLabel={(option) => option}
          onChange={(e, a) => setFilter({ ...filter, location: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />{' '}
        <Select
          value={status}
          label="Status"
          style={{ marginTop: '5px' }}
          onChange={(e) => {
            setStatus(e.target.value);
            setFilter({ ...filter, status: e.target.value });
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>{' '}
        <Button
          variant="outlined"
          style={{ height: '53px' }}
          onClick={(e) => goFilter(e)}
        >
          Filter
        </Button>
      </center>
      <CSVLink
        className="exportButton"
        data={data.rows}
        filename={'orders.csv'}
        headers={headers}
      >
        EXPORT
      </CSVLink>
      <MDBDataTable
        striped
        info={false}
        bordered
        small
        hover
        data={data}
        noBottomColumns
      />

      {editModal && (
        <OrderEditModal
          data={orderData}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}

      {view ? (
        <Modal open={true} onClose={() => setView(!view)}>
          <Box sx={style}>
            <img src={viewImg} alt="" style={{ height: '80vh' }} />
          </Box>
        </Modal>
      ) : null}
    </div>
  );
};

export default OrderManagement;
