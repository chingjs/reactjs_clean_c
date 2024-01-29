import React, { useState, useEffect } from 'react';
import { Typography, Box, Modal, Grid, Button } from '@mui/material';
import './admin.css';
import { updateOperator, verifyToken, getOperatorList } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OperatorEditModal({ data, editModal, setEditModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.adminReducer);
  const [modalData, setModalData] = useState(data);
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   } dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, [])

  const saveOperator = () => {
    const sendData = {
      status: modalData.status,
      id: data.id,
      full_name: modalData.full_name,
      phone_number: modalData.phone_number,
      email: modalData.email,
      adminName: admin && admin.name
    }
    dispatch(updateOperator(sendData));
    dispatch(getOperatorList({ status: 'Active' }));
    setEditModal(false);
  };
  const handleEditCancel = () => {
    setEditModal(false);
  };

  return (
    <Modal open={editModal} onClose={handleEditCancel}>
      <Box className="admin-operator-modal-bg">
        <Typography variant="h3">Update Driver</Typography>
        <br />
        <Divider />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled value={modalData.oid}
              label='ID' placeholder="Enter the ID" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth required value={modalData.full_name}
              onChange={(e) => setModalData({ ...modalData, full_name: e.target.value })}
              label='Name' placeholder="Enter the name" />
          </Grid>
        </Grid>
        <br />
        <Grid item xs={6}>
          <TextField fullWidth required value={modalData.phone_number}
            onChange={(e) => setModalData({ ...modalData, phone_number: e.target.value })}
            label='Number' placeholder="Enter the phone" />
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth required value={modalData.email}
              onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
              label='Email' placeholder="Enter the email" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled value={moment(new Date(modalData.createdAt)).format('YYYY-MM-DD')}
              label='Join Date' />
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select value={modalData.status} label='Status'
                onChange={(e) => setModalData({ ...modalData, status: e.target.value })} >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <br />
        {/* {error} */}
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <div className="admin-order-edit-cancel">
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
            <div className="admin-order-edit-btn">
              <Button
                type="submit"
                variant="contained"
                onClick={() => saveOperator()}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal >
  );
}

export default OperatorEditModal;
