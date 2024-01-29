import React, { useState, useRef } from 'react';
import { Typography, Box, Modal, TextField, Grid, Button } from '@mui/material';
import './admin.css';
import { Divider } from '@mui/material';
import { updateFabric } from '../../redux/actions/adminActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Resizer from 'react-image-file-resizer';
import { resizeFile } from '../../utils/helperFunc';

function ServiceEditModal({ data, editModal, setEditModal }) {
  const dispatch = useDispatch();
  // console.log("checkdata", data)
  const [modalData, setModalData] = useState({ ...data, newprice: '', newstatus: true });
  const saveService = () => {
    // console.log('checkprice', modalData);
    dispatch(updateFabric(modalData));
    setEditModal(false);
  };
  const handleEditCancel = () => {
    setEditModal(false);
  };
  const images = data.photo_url ? data.images : '';
  const inputRef = useRef();
  const [uri, setUri] = useState(images);
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  async function uploadReceiptOnChange(e) {
    const file = e.target.files[0];
    const resized = file && (await resizeFile(file));
    setModalData({ ...modalData, photoUrl: resized, filetype: file.type });
  }

  const handleImage = (e) => {
    // let fileInput = false;
    uploadReceiptOnChange(e);
    e.preventDefault();
    if (e.target.files) {
      Resizer.imageFileResizer(
        e.target.files[0],
        500,
        500,
        'PNG',
        30,
        0,
        (uri) => {
          setUri(uri);
        }
      );
    }
  };
  const deleteImage = (image) => {
    setUri('')
  }
  console.log(modalData)
  return (
    <Modal open={editModal} onClose={handleEditCancel}>
      <Box className="admin-operator-modal-bg">
        <Typography variant="h4">Update Item Type</Typography>
        <br />
        <Divider />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled value={modalData.service_type.name}
              label='Category' placeholder="Choose the Category" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth required value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              label='Name' placeholder="Enter the name" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled required value={modalData.price} type='number'
              onChange={(e) => setModalData({ ...modalData, price: e.target.value })}
              label='Current Price (RM)' placeholder="Enter the price" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth required value={modalData.strategy} type='text'
              onChange={(e) => setModalData({ ...modalData, strategy: e.target.value })}
              label='Pricing Strategy' placeholder="Enter the Pricing Strategy" />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled value={moment(new Date(modalData.createdAt)).format('YYYY-MM-DD')}
              label='Created Date' />
          </Grid>
        </Grid>
        <br />
        <Grid>
          <Grid item xs={6}>
            <TextField fullWidth disabled required value={modalData.status ? 'Active' : 'Inactive'}
              label='Status' />
          </Grid>
        </Grid>
        <br />
        <Grid >
          <Grid item xs={6}>
            <TextField fullWidth required value={modalData.newprice}
              onChange={(e) => setModalData({ ...modalData, newprice: e.target.value })}
              type='number'
              label='New Price (RM)' placeholder="Enter the new price" />
          </Grid>
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '5%', paddingBottom: '2%', border: '1px solid grey' }}>
          {uri ? (
            <img
              style={{
                width: '150px',
                height: '150px',
                marginTop: '2%',
                marginBottom: '2%',
                borderRadius: '100px',
              }}
              src={uri ? uri : data.images}
              alt=""
            />
          ) : null}
          <br />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            id="inputFile"
            className="upload-button-my-profile"
            onChange={(e) => handleImage(e)}
            hidden
          // required
          />
          <button
            onClick={(e) => onButtonClick(e)}
            className="upload-button-edit-item-type"
          >
            Upload Image
          </button>
          <br />
          <button
            onClick={(e) => deleteImage(e)}
            className="clear-button-edit-item-type"
          >
            Clear
          </button>
        </div>
        <br />
        <Grid container>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">New Status</InputLabel>
              <Select value={modalData.newstatus} label='New Status'
                onChange={(e) => setModalData({ ...modalData, newstatus: e.target.value })} >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
                onClick={() => saveService()}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ServiceEditModal;
