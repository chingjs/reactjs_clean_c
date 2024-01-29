import React from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import './admin.css';
import {
  updateLockerStatus, getAllLocker
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function EditLockerStatus({ editModal, setEditModal, editData, setEditData }) {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.adminReducer);

  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      id: editData.id,
      strategy: editData.strategy
    }
    dispatch(updateLockerStatus(sendData));
  }

  const closeModal = () => {
    dispatch(getAllLocker());
    setEditModal(false)
  }
  return (
    <Modal open={editModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Edit Locker</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>

              <TextField fullWidth required value={editData.strategy}
                onChange={(e) => setEditData({ ...editData, strategy: e.target.value })} label='Pricing Strategy' placeholder="Enter the Pricing Strategy" /> <br /><br />


              {editData.strategy && !message ? <button type='submit' className="admin-create-input" variant='contained' >Update</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>Updated Successfully</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default EditLockerStatus;
