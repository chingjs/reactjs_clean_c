import React, { useState, useEffect } from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import '../admin.css';
import {
  getAdmin,
  createAdmin,
  getLocationList
} from '../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';

function EditAdminModal({ editModal, setEditModal, editData, setEditData }) {
  const dispatch = useDispatch();
  const { message, error, locationList } = useSelector((state) => state.adminReducer);
  const userType = ['INVESTOR', 'SERVICE PROVIDER']
  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const [location, setLocation] = useState({ options: [], loading: false });

  useEffect(() => {
    if (!locationList.length) {
      dispatch(getLocationList());
    }
    // eslint-disable-next-line
  }, [locationList]);
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdmin(editData));
  }

  useEffect(() => {
    if (!location.options.length) {
      setLocation({ options: locationList, loading: true });
    }  // eslint-disable-next-line
  }, [location]);
  const closeModal = () => {
    dispatch(getAdmin());
    setEditModal(false)
  }
  return (
    <Modal open={editModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Edit User</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>


              <TextField fullWidth value={editData.username} label='Username' placeholder="Enter the Username" /> <br /><br />
              <TextField fullWidth value={editData.newpassword} type='password'
                onChange={(e) => setEditData({ ...editData, newpassword: e.target.value })} label='New Password' placeholder="Enter the New Password" /> <br /><br />
              <TextField fullWidth value={editData.email} type='email'
                onChange={(e) => setEditData({ ...editData, email: e.target.value })} label='Email' placeholder="Enter the Email"/> <br /><br />
              <Autocomplete
                value={editData.type}
                options={userType}
                getOptionLabel={(option) => option}
                onChange={(e, a) => setEditData({ ...editData, type: a })}
                style={{ width: 460 }}
                renderInput={(params) => (
                  <TextField {...params} label="User Type" />
                )}
              />
              <Autocomplete
                multiple
                options={location.options}
                getOptionLabel={(option) => option.location}
                onChange={(e, a) => setEditData({ ...editData, location: a })}
                style={{ marginTop: '10px', width: 460 }}
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
              />
              {editData.username && !message ? <button type='submit' className="admin-create-input" variant='contained' >Update</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>Updated Successfully</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default EditAdminModal;
