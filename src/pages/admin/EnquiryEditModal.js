import React, { useState } from 'react';
import { Typography, Box, Modal, TextField, Grid, Button } from '@mui/material';
import './admin.css';
import { Divider } from '@mui/material';
import { updateEnquiry } from '../../redux/actions/adminActions';
import { useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function EnquiryEditModal({ data, editModal, setEditModal }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(data.status);
  const id = data.id;
  const updateStatus = () => {
    dispatch(updateEnquiry({ id, status }));
    setEditModal(false);

  };

  const handleEditCancel = () => {
    setEditModal(false);
  };
  // console.log("checkenquiry", data)
  return (
    <Modal open={editModal} onClose={handleEditCancel}>
      <Box className="admin-enquiry-modal-bg">
        <Typography variant="h4">Update Enquiry</Typography>
        <Divider />
        <br />
        <Grid container>
          <Grid item xs={2}>
            <h3>Enquiry ID</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>: {data.id.slice(1, 8)}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Order ID</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.orderId ? data.orderId : '-'}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Name</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>: {data.full_name}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Phone Number</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {data.phone_number}</h3>
          </Grid>
          <Grid item xs={2}>
            <h3>Email</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>: {data.email}</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Date</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>: {moment(new Date(data.createdAt)).format('YYYY-MM-DD')}</h3>
          </Grid>
          {/* <Grid item xs={2}>
            <h3>Subjects</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>: {data.subject}</h3>
          </Grid> */}
          <Grid item xs={2}>
            <h3>Status</h3>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select label='Status' defaultValue='Pending' value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value={'Processed'}>Processed</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Grid>

          <Grid item xs={9}>
            <Box
              sx={{
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label='Message' value={data.message} multiline rows={4} />
            </Box>
          </Grid>
        </Grid>
        <br />

        {/* {error} */}
        <Grid container justifyContent="center">
          <Grid item xs={2}>
            <div>
              <Button
                type="submit"
                variant="contained"
                onClick={() => handleEditCancel()}
              >
                Cancel
              </Button>
            </div>
          </Grid>
          {data[7] !== 'Processed' ? (
            <Grid>
              <div className="admin-order-edit-btn">
                <Button variant="contained" onClick={() => updateStatus()}>
                  Update
                </Button>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Modal>
  );
}

export default EnquiryEditModal;
