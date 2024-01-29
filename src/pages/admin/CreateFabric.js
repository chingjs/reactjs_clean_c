import React, { useEffect, useState, useRef } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { createFabric, getCategory } from '../../redux/actions/adminActions';
import { Paper, Grid, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Resizer from 'react-image-file-resizer';
import { resizeFile } from '../../utils/helperFunc';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

const CreateFabric = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken');
    //     console.log('check')
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }// eslint-disable-next-line
    // }, [])
    const paperStyle = { padding: '30px 20px', width: 500, margin: "130px auto" }
    const [fabricData, setFabricData] = useState({
        name: '',
        desc: '',
        price: '',
        serviceTypeId: '',
        photoUrl: '',
        strategy: '',
    });
    const { message, error, categoryList } = useSelector((state) => state.adminReducer);
    const [list, setList] = useState({ options: [], loading: false });
    const headerStyle = { margin: 0 }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createFabric(fabricData));
    };
    const inputRef = useRef();
    const [uri, setUri] = useState('');
    const onButtonClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    useEffect(() => {
        // dispatch(clearError())
        if (list.loading !== true) {
            dispatch(getCategory())
        }
        // eslint-disable-next-line
    }, [message, error])

    useEffect(() => {
        if (categoryList) {
            setList({ options: categoryList, loading: true });
        }
    }, [categoryList]);
    // console.log("message", message)

    async function uploadReceiptOnChange(e) {
        const file = e.target.files[0];
        const resized = file && (await resizeFile(file));
        setFabricData({ ...fabricData, photoUrl: resized, filetype: file.type });
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
    const deleteImage = (e) => {
        e.preventDefault();
        setUri('')
    }
    // console.log('f',fabricData)
    return (
        <div>
            <Header />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2 style={headerStyle}>Create New Item Type</h2>
                        <br />
                    </Grid>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField fullWidth required value={fabricData.name}
                            onChange={(e) => setFabricData({ ...fabricData, name: e.target.value })} pattern="^(\+?6?01)[0-46-9]-*[0-9]{7,8}$" label='Item Name' placeholder="Enter the name" />
                        <br />
                        <br />
                        {/* <TextField fullWidth value={fabricData.desc}
                            onChange={(e) => setFabricData({ ...fabricData, desc: e.target.value })} label='Description' type='text' placeholder="Enter the description" />
                        <br />
                        <br /> */}
                        <TextField fullWidth required value={fabricData.price}
                            onChange={(e) => setFabricData({ ...fabricData, price: e.target.value })} type='number' label='Price' placeholder="Enter the price" />
                        <br />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel required id="demo-simple-select-label">Category</InputLabel>
                            <Select fullWidth required value={fabricData.serviceTypeId}
                                onChange={(e) => setFabricData({ ...fabricData, serviceTypeId: e.target.value })} label='Category' id='category' >
                                {list.options &&
                                    list.options.map((category, idx) => (
                                        <MenuItem key={idx} value={category.id}>{category.name}</MenuItem>
                                    ))}     </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField fullWidth required value={fabricData.strategy}
                            onChange={(e) => setFabricData({ ...fabricData, strategy: e.target.value })} type='text' label='Pricing Strategry' placeholder="Enter the Pricing Strategy" />
                        <br />
                        <br />
                        <div style={{ textAlign: 'center', marginTop: '5%', paddingBottom: '5%', border: '1px solid grey' }}>
                            {uri ? (
                                <img
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        marginTop: '2%',
                                        marginBottom: '2%',
                                        borderRadius: '100px',
                                    }}
                                    src={uri}
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
                                className="upload-button-item-type"
                            >
                                Upload Image
                            </button>
                            <br />
                            <button
                                onClick={(e) => deleteImage(e)}
                                className="clear-button-item-type"
                            >
                                Clear
                            </button>
                        </div>

                        <center>
                            <div className="admin-error">{message ? <div className="admin-success-msg">{message} </div> : error}</div>
                        </center>
                        <button type='submit' className="admin-create-input" variant='contained' >Create</button>
                    </form>
                </Paper>
            </Grid>
        </div >
    );
};

export default CreateFabric;
