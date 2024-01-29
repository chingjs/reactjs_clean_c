import React, { useState } from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import '../admin.css';
import {
  getMDR,
  createMDR
} from '../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function AddMDRModal({ addModal, setAddModal }) {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.adminReducer);
  const [data, setData] = useState({
    name: '',
    rate: '',
    min: '',
    // effective: '',
    fixed: '',
    note: ''

  });

  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMDR(data));
  }

  const closeModal = () => {
    dispatch(getMDR());
    setAddModal(false)
  }
  return (
    <Modal open={addModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Create New MDR</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>
              
               <TextField fullWidth required value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}  label='Payment Type' placeholder="Enter the Payment Type" /> <br/><br/>
                <TextField fullWidth required value={data.rate}
                onChange={(e) => setData({ ...data, rate: e.target.value })}  label='Rate' placeholder="Enter the Rate" /> <br/><br/>
                <TextField fullWidth required value={data.min}
                onChange={(e) => setData({ ...data, min: e.target.value })}  label='Minimum Amount' placeholder="Enter the Minimum Amount" /> <br/><br/>
                <TextField fullWidth required value={data.fixed}
                onChange={(e) => setData({ ...data, fixed: e.target.value })}  label='Fixed' placeholder="Enter the Fixed" /> <br/><br/>
                {/* <TextField fullWidth value={data.effective} type='date'
                onChange={(e) => setData({ ...data, effective: e.target.value })} /> <br/><br/> */}
                <TextField fullWidth value={data.note}
                onChange={(e) => setData({ ...data, note: e.target.value })} multiline rows={3} label='Note' placeholder="Note" /> <br/><br/>

              {data.name && !message ? <button type='submit' className="admin-create-input" variant='contained' >Create</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{message}</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default AddMDRModal;
