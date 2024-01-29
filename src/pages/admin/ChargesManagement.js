import React, { useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getCharges, verifyToken, getLocationList } from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button } from '@mui/material';

const ChargesManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken');
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     dispatch(getLocationList())
    //     // eslint-disable-next-line
    // }, [])
    const { admin, chargesList, locationList, location } = useSelector((state) => state.adminReducer);

    const [filter, setFilter] = useState({
        startDate: "",
        endDate: new Date(),
        location: [],
    })

    const locationOpt = locationList.map(option => option.location)

    useEffect(() => {
        if (admin && admin.name) {
            const sendData = {
                name: admin && admin.name,
                location
            }
            dispatch(getCharges(sendData));
        }
        // eslint-disable-next-line
    }, [admin]);

    const data = {
        columns: [
            {
                field: 'date',
                label: 'Date',
            },
            {
                field: 'oid',
                label: 'Order ID',
            },
            {
                field: 'location',
                label: 'Location',
            },
            {
                field: 'action',
                label: 'Action',
            },
            {
                field: 'reason',
                label: 'Reason',
            },
            {
                field: 'olditem',
                label: "Old Item Name",
            },
            {
                field: 'oldprice',
                label: "Old Price",
            },
            {
                field: 'item',
                label: "New Item Name",
            },
            {
                field: 'qty',
                label: "New Item Quantity",
            },
            {
                field: 'amount',
                label: "Amount",
            },
            {
                field: 'createdBy',
                label: "Created By",
            },

        ],
        rows:
            chargesList && chargesList.map((data) => {
                return {
                    ...data,
                    oldprice: data.oldprice ? parseFloat(data.oldprice).toFixed(2) : '0',
                    amount: data.amount ? parseFloat(data.amount).toFixed(2) : '0',
                    action: data.action.toUpperCase(),
                    date: moment(new Date(data.createdAt)).format('YYYY/MM/DD'),
                    createdBy: data.createdBy ? data.createdBy : 'admin'
                };
            })
    }

    const goFilter = (e) => {
        e.preventDefault();
        const sendData = {
            ...filter,
            name: admin && admin.name,
            //   status: status ? status : 'active',
            location: location[0] ? location : filter.location
        }
        dispatch(getCharges(sendData));
    }

    return (
        <div style={{ padding: '1%', textAlign: 'right' }}>
            <Header />
            <br />
            <br />
            <br />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>CHARGES MANAGEMENT</div>
            <br />
            <center>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={filter.startDate}
                        onChange={(newValue) => {
                            setFilter({ ...filter, startDate: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    /> {" "}
                    <DatePicker
                        style={{ fontSize: '10px' }}
                        label="End Date"
                        value={filter.endDate}
                        onChange={(newValue) => {
                            setFilter({ ...filter, endDate: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <Autocomplete
                    multiple
                    options={locationOpt} // Filter out selected options
                    getOptionLabel={(option) => option}
                    onChange={(e, a) =>
                        setFilter({ ...filter, location: a })
                    }
                    style={{ marginTop: '10px', width: 460 }}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />
                <br />
                <Button variant="outlined" style={{ height: '53px' }} onClick={(e) => goFilter(e)}>Filter</Button>
            </center>
            <br />
            <MDBDataTable
                striped
                bordered
                small
                hover
                info={false}
                noBottomColumns
                data={data} />
        </div>
    );
};

export default ChargesManagement;
