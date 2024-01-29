import React, { useState, useEffect } from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import '../admin.css';
import {
  getAdmin,
  createAdmin,
  getLocationList,
} from '../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';

function AddAdminModal({ addModal, setAddModal }) {
  const dispatch = useDispatch();
  const { message, error, admin, locationList } = useSelector((state) => state.adminReducer);
  const [location, setLocation] = useState({ options: [], loading: false });

  useEffect(() => {
    if (!locationList.length) {
      dispatch(getLocationList());
    }
    // eslint-disable-next-line
  }, [locationList]);

  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    type: '',
    currentUser: admin.name,
    location: '',
  });

  useEffect(() => {
    if (!location.options.length) {
      setLocation({ options: locationList, loading: true });
    }  // eslint-disable-next-line
  }, [location]);

  const userType = ['INVESTOR', 'SERVICE PROVIDER']
  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdmin(data));
  }

  const closeModal = () => {
    dispatch(getAdmin());
    setAddModal(false)
  }

  return (
    <Modal open={addModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Create New User</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>

              <TextField fullWidth required value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })} label='Username' placeholder="Enter the Username" /> <br /><br />
              <TextField fullWidth required value={data.password} type='password'
                onChange={(e) => setData({ ...data, password: e.target.value })} label='Password' placeholder="Enter the Password" /> <br /><br />
              <TextField fullWidth value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })} label='Email' placeholder="Enter the Email" /> <br /><br />
              <Autocomplete
                required
                options={userType}
                getOptionLabel={(option) => option}
                onChange={(e, a) => setData({ ...data, type: a })}
                style={{ width: 460 }}
                renderInput={(params) => (
                  <TextField {...params} label="User Type" />
                )}
              />
              <Autocomplete
                multiple
                options={location.options}
                getOptionLabel={(option) => option.location}
                onChange={(e, a) => setData({ ...data, location: a })}
                style={{ marginTop: '10px', width: 460 }}
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
              />
              {data.username && !message ? <button type='submit' className="admin-create-input" variant='contained' >Create</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{message}</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default AddAdminModal;
