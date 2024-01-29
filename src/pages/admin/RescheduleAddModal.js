import React, { useState, useEffect } from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import './admin.css';
import { Calendar } from 'react-calendar';
import {
  getReschedule,
  getAllOperator,
  createReschedule,
  getOrderID
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RescheduleAddModal({ addModal, setAddModal }) {
  const dispatch = useDispatch();
  const [list, setList] = useState({ options: [], loading: false });
  const { message, error, orderList, operator, admin, location } = useSelector((state) => state.adminReducer);

  const [data, setData] = useState({
    orderId: '',
    reason: '',
    currentDate: '',
    newDate: new Date(),
    delivered: false,
    driverId: '',
    adminName: admin && admin.name,

  });

  useEffect(() => {
    if (admin && admin.name) {
      const sendData = {
        name: admin && admin.name,
        location,
        status: 'active'
      }
      dispatch(getOrderID(sendData))
    }
    // eslint-disable-next-line
  }, [admin])

  useEffect(() => {
    if (orderList) {
      setList({ options: orderList, loading: true });
    } // eslint-disable-next-line
  }, [orderList]);

  const [operatorList, setOperatorList] = useState({
    options: [],
    loading: false,
  });
  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReschedule(data));
  }

  useEffect(() => {
    if (operatorList.loading !== true) {
      dispatch(getAllOperator());
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setOperatorList({ options: operator, loading: true });
    // eslint-disable-next-line
  }, [operator]);

  const checkOrder = (e) => {
    let currentDate = orderList.filter(a => a.oid === e.target.value)[0]
    setData({
      ...data, orderId: e.target.value, currentDate: currentDate.pick_up_date, delivered: currentDate.delivered_time ? true : false, phone_number: currentDate.phone_number
    })
  }

  const closeModal = () => {
    if (admin && admin.name) {
      const sendData = {
        name: admin && admin.name,
        location
      }
      dispatch(getReschedule(sendData));
    }
    setAddModal(false)

  }

  return (
    <Modal open={addModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Create Reschedule Collection</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Order ID</InputLabel>
                <Select fullWidth required value={data.orderId}
                  onChange={(e) => checkOrder(e)} label='Order ID' >
                  {list.options &&
                    list.options.map((order, idx) => (
                      <MenuItem key={idx} value={order.oid}>{order.oid}</MenuItem>
                    ))}     </Select>
              </FormControl>
              <br />
              <br />

              {data.currentDate ? <>
                <TextField fullWidth value={data.phone_number} type='text'
                  label='Phone Number' /><br /><br />
                <TextField fullWidth value={moment(data.currentDate).format('DD/MM/YYYY')} type='text'
                  label='Current Collection Date' /><br /><br />
                <InputLabel>New Collection Date :</InputLabel>
                <Calendar
                  className="admin-calendar-div"
                  label='Current Collection Date'
                  onChange={(e) => setData({ ...data, newDate: e })}
                  value={data.newDate}
                /> </> : ''}
              <br />
              <br />
              {data.delivered ? <Grid>
                <FormControl fullWidth>
                  <InputLabel>Assign Operator</InputLabel>
                  <Select
                    required
                    label='Assign Operator'
                    value={data.driverId}
                    onChange={(e) => setData({ ...data, driverId: e.target.value })}
                  >
                    {operatorList.options &&
                      operatorList.options.map((operator, idx) => (
                        <MenuItem key={idx} value={operator.oid}>
                          {operator.full_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid> : ''}
              <br />
              {data.currentDate ? <TextField fullWidth required value={data.reason}
                onChange={(e) => setData({ ...data, reason: e.target.value })} multiline rows={3} label='Reason' placeholder="Enter the reason" /> : ''}
              {data.reason && !message ? <button type='submit' className="admin-create-input" variant='contained' >Create</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{message}</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default RescheduleAddModal;
