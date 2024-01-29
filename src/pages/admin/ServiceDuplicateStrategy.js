import React, { useState } from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import './admin.css';
import {
  duplicatePricingData, getAllService
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';

function ServiceDuplicateStrategy({ editModal, setEditModal, editData, setEditData }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    strategy: '',
    newName: ''
  })
  const { message, error } = useSelector((state) => state.adminReducer);

  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(duplicatePricingData(data));
  }

  const closeModal = () => {
    dispatch(getAllService())
    setEditModal(false)
  }

  return (
    <Modal open={editModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Duplicate Pricing Strategy</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>

              <Autocomplete
                options={editData}
                getOptionLabel={(option) => option}
                onChange={(e, a) => setData({ ...data, strategy: a })}
                style={{ marginTop: '10px', width: 460 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Pricing Strategy" />
                )}
              /> <br /><br />

              {data.strategy ? <TextField fullWidth required value={data.newName}
                onChange={(e) => setData({ ...data, newName: e.target.value })} label='Name' placeholder="Enter the Name" /> : ''}
              < br /> <br />


              {data.strategy && !message ? <button type='submit' className="admin-create-input" variant='contained' >Duplicate</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>Created Successfully</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default ServiceDuplicateStrategy;
