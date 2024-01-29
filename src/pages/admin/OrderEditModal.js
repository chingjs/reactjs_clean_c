import React, { useState, useEffect } from 'react';
import { Typography, Box, Modal, Grid, Button } from '@mui/material';
import './admin.css';
import { Divider } from '@mui/material';
import {
  getLockerByLocation,
  updateBooking,
  getAllOperator,
  updatePickUpOrder,
  updateDeliveryOrder,
  getOrderDetails,
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// data[8] = delivered_time , data[7] = pick_up_time
function OrderEditModal({ data, editModal, setEditModal }) {
  const dispatch = useDispatch();
  const depositTime = data.deposit_time;
  const pickupTime = data.pick_up_time;
  const delivered = data.delivered_time;
  const status = data.status;
  const collectLockerId = data.collectLockerId;
  const [lockerList, setLockerList] = useState({ options: [], loading: false });
  const [operatorList, setOperatorList] = useState({
    options: [],
    loading: false,
  });
  // const { locker } = useSelector((state) => state.userReducer);
  const { operator, lockerByLocation, orderDetails } = useSelector((state) => state.adminReducer);
  const [lockerInput, setLockerInput] = useState('');
  const [operatorInput, setOperatorInput] = useState('');
  // console.log('checkoperator', data);
  // console.log('deposit', depositTime);
  // console.log(orderDetails);

  const saveOrder = () => {
    const lockerData = {
      location: data.location,
      lockerNo: lockerInput,
    }
    // console.log('check sendData', lockerData);
    if (operatorInput) {
      const sendData = {
        orderId: data.oid,
        collectLockerId: lockerInput,
        operatorId: operatorInput,
      };
      if (!pickupTime) {
        dispatch(updatePickUpOrder(sendData));
        setEditModal(false);
        // console.log('senddata', sendData);
      } else {
        dispatch(updateDeliveryOrder(sendData));
        dispatch(updateBooking(lockerData));
        setEditModal(false);
        // console.log('senddata', sendData);
      }
    } else {
      // setError("Operator & Locker can't be empty!");
    }
  };
  // console.log("details", orderDetails)
  const handleEditCancel = () => {
    setEditModal(false);
  };
  const rows = orderDetails && orderDetails.map((dtl) => {
    return {
      ...dtl,
    };
  });

  useEffect(() => {
    const oid = data.oid;
    dispatch(getOrderDetails({ oid }));


    if (lockerList.loading !== true) {
      const location = data.location;
      dispatch(getLockerByLocation({ location }));
    }
    if (operatorList.loading !== true) {
      dispatch(getAllOperator());
    }
    // eslint-disable-next-line
  }, []);

  // console.log(totalCancelQty, totalCancelAmount)
  // console.log(data)

  useEffect(() => {
    setLockerList({ options: lockerByLocation, loading: true });
    setOperatorList({ options: operator, loading: true });
    // eslint-disable-next-line
  }, [operator, lockerByLocation]);
  return (
    <Modal open={editModal} onClose={handleEditCancel}>
      <Box className="admin-order-modal-bg">
        <Typography variant="h4">Edit Order</Typography>
        <Divider />
        <br />
        <Grid container>
          <Grid item xs={2}>
            <h3>Order ID</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.oid}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Order Date</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>: {moment(new Date(data.createdAt)).format('YYYY-MM-DD')}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Item Type</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.serviceType}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Request Date (Collect)</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.pick_up_date ? moment(new Date(data.pick_up_date)).format('YYYY-MM-DD') : '-'}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Quantity</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.quantity - data.totalCancelQty} PCS</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Status</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.status}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Total Amount</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: RM {((data.subtotal - data.totalCancelAmount) + ((data.subtotal - data.totalCancelAmount) * 0.06) - (data.codeAmount + (data.codeAmount * 0.06))).toFixed(2)}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Location</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.location}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Customer Note</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.note ? data.note : '-'}</h3>
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={2}>
            <h3>Uploaded Photo</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>: {data.images.map((img, idx) => <img key={idx} src={img} alt='' height='250' width='auto' />)}</h3>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container>
          <Grid item xs={3}>
            <h3>Current Operator :</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>{!pickupTime ? data.pick_up_driver ? data.pick_up_driver : '-' : data.delivery_driver ? data.delivery_driver : '-'}</h3>
          </Grid>
          {status !== 'completed' ? (
            <>
              <Grid item xs={3}>
                <h3>Assign New Operator :</h3>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Assign Operator</InputLabel>
                  <Select
                    required
                    label='Assign Operator'
                    style={{ width: '180px' }}
                    value={operatorInput}
                    onChange={(e) => setOperatorInput(e.target.value)}
                  >
                    {operatorList.options &&
                      operatorList.options.map((operator, idx) => (
                        <MenuItem key={idx} value={operator.oid}>
                          {operator.full_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ) : null}
          <Grid item xs={3}>
            <h3>Current Locker ID :</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>{pickupTime === '-' ? data.lockerId ? data.lockerId : '-' : collectLockerId ? collectLockerId : '-'}</h3>
          </Grid>
          {!delivered && pickupTime ? (
            <>
              <Grid item xs={3}>
                <h3>Assign New Locker :</h3>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Assign New Locker</InputLabel>
                  <Select
                    required
                    label='Locker'
                    style={{ width: '180px' }}
                    value={lockerInput}
                    onChange={(e) => setLockerInput(e.target.value)}
                  >
                    {lockerList.options &&
                      lockerList.options.map((locker, idx) => (
                        <MenuItem key={idx} value={locker.name}>{locker.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ) : null}
        </Grid>
        <br />
        <Divider />
        <br />
        <div className="data-details">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows &&
                rows.map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.cancel ? <s style={{color:"#a9a9a9"}}>{row.item}</s> : row.item}</strong></td>
                    <td><strong>{row.cancel ? <s style={{color:"#a9a9a9"}}>{row.qty}</s> : row.qty}</strong></td>
                    <td><strong>{row.cancel ? <s style={{color:"#a9a9a9"}}>{-row.price}</s> : row.price}</strong></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <MDBDataTable
          entries={5}
          striped
          info={false}
          bordered
          noBottomColumns
          data={dataDetails}
        /> */}
        {!depositTime ? (
          <div className="admin-error">
            Items not deposit items to the locker yet!
          </div>
        ) : null}
        {/* {error} */}
        <Grid container justifyContent="center">
          <Grid item xs={3}>
            <div >
              <Button
                type="submit"
                variant="contained"
                onClick={() => handleEditCancel()}
              >
                Cancel
              </Button>
            </div>
          </Grid>
          <Grid>
            <div >
              {status !== 'completed' && depositTime && !delivered ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => saveOrder()}
                >
                  Update
                </Button>
              ) : null}
            </div>
            <br />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default OrderEditModal;
