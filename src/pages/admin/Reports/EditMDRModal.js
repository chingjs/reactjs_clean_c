import React from 'react';
import { Paper, Box, Modal, Grid, TextField } from '@mui/material';
import '../admin.css';
import {
  getMDR,
  createMDR
} from '../../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function EditMDRModal({ editModal, setEditModal, editData,setEditData }) {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.adminReducer);

  const paperStyle = { padding: '20px 20px', width: 500, margin: "60px" }
  const headerStyle = { margin: 0 }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMDR(editData));
  }

  const closeModal = () => {
    dispatch(getMDR());
    setEditModal(false)
  }
  return (
    <Modal open={editModal} onClose={() => closeModal()}>
      <Box className="admin-reschedule-modal-bg">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <div className='reschedule-close' onClick={() => closeModal()}> X </div>
              <h2 style={headerStyle}>Edit MDR</h2>
              <br />
            </Grid>
            <form onSubmit={(e) => handleSubmit(e)}>

              <TextField fullWidth required value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })} label='Payment Type' placeholder="Enter the Payment Type" /> <br /><br />
              <TextField fullWidth required value={editData.rate}
                onChange={(e) => setEditData({ ...editData, rate: e.target.value })} label='Rate' placeholder="Enter the Rate" /> <br /><br />
              <TextField fullWidth required value={editData.min}
                onChange={(e) => setEditData({ ...editData, min: e.target.value })} label='Minimum Amount' placeholder="Enter the Minimum Amount" /> <br /><br />
              <TextField fullWidth required value={editData.fixed}
                onChange={(e) => setEditData({ ...editData, fixed: e.target.value })} label='Fixed' placeholder="Enter the Fixed" /> <br /><br />
              {/* <TextField fullWidth value={data.effective} type='date'
                onChange={(e) => setData({ ...data, effective: e.target.value })} /> <br/><br/> */}
              <TextField fullWidth value={editData.note}
                onChange={(e) => setEditData({ ...editData, note: e.target.value })} multiline rows={3} label='Note' placeholder="Note" /> <br /><br />

              {editData.name && !message ? <button type='submit' className="admin-create-input" variant='contained' >Update</button> : ''}
              {error ? <div style={{ color: 'red', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>{error}</div> : ''}
              {message ? <div style={{ color: 'green', textAlign: 'center', fontSize: '20px', marginTop: '2%' }}>Updated Successfully</div> : ''}
            </form>
          </Paper>
        </Grid>
      </Box>
    </Modal >
  )
}

export default EditMDRModal;
