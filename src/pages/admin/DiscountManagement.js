import React, { useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
    verifyToken,
    getCategory,
    getLocationList,
    getAllCode,
    createCode,
    editCode,
    clearError
} from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DiscountManagement = () => {

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [codeId, setCodeId] = useState("");
    const [service, setService] = useState([]);
    const [end_date, setEndDate] = useState("");
    const [location, setLocation] = useState([]);
    const [start_date, setStartDate] = useState("");
    const [redeem_per_day, setRedeemPerDay] = useState();
    const [redeem_per_month, setRedeemPerMonth] = useState();
    const [redeem_per_user, setRedeemPerUser] = useState();
    const [disable, setDisable] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken');
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     dispatch(getAllCode());
    //     dispatch(getCategory());
    //     dispatch(getLocationList());
    //       // eslint-disable-next-line
    // }, []);

    const { categoryList, locationList, codeList, message, error } = useSelector((state) => state.adminReducer);

    const handleOpen = () => {
        setOpen(true);
        dispatch(clearError());
    };

    const handleClose = () => {
        setOpen(false);
        setCode("");
        setCodeId("");
        setStartDate(null);
        setEndDate(null);
        setAmount("");
        setType("");
        setLocation([]);
        setService([]);
        setRedeemPerUser("");
        setRedeemPerDay("");
        setRedeemPerMonth("");
        dispatch(clearError());
        dispatch(getAllCode());
        setDisable(false);
        setErrorMsg(null);
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        if (code && start_date && end_date && amount && type && (location.length || service.length)) {
            // console.log("Success", redeem_per_user);
            let data = {
                code, start_date, end_date, amount, type,
                redeem_per_user: redeem_per_user ? redeem_per_user : 0,
                redeem_per_day: redeem_per_day ? redeem_per_day : 0,
                redeem_per_month: redeem_per_month ? redeem_per_month : 0,
                location,
                service,
            };

            dispatch(createCode({ data }));
            setErrorMsg(null);
        }
        else {
             setErrorMsg("Fail, please fill all of the required fields");
        }
        dispatch(getAllCode());
    };

    const addCodeInfo = (data) => {

        setCodeId(data.id)
        setCode(data.code);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setAmount(data.amount);
        setType(data.type);
        setLocation(data.location);
        setService(data.service);

        if (data.redeem_per_user === 0) {
            setRedeemPerUser();
        }
        else {
            setRedeemPerUser(data.redeem_per_user);
        }

        if (data.redeem_per_day === 0) {
            setRedeemPerDay();
        }
        else {
            setRedeemPerDay(data.redeem_per_day);
        }

        if (data.redeem_per_month === 0) {
            setRedeemPerMonth();
        }
        else {
            setRedeemPerMonth(data.redeem_per_month);
        }

        setDisable(true);
        setOpen(true);
    }

    const updateCode = (event) => {
        event.preventDefault();
        // console.log('Update');

        if (codeId && code && start_date && end_date && amount && type && (location.length || service.length)) {
            // console.log("Success", redeem_per_user);
            let data = {
                id: codeId,
                code, start_date, end_date, amount, type,
                redeem_per_user: redeem_per_user ? redeem_per_user : 0,
                redeem_per_day: redeem_per_day ? redeem_per_day : 0,
                redeem_per_month: redeem_per_month ? redeem_per_month : 0,
                location,
                service,
            };

            dispatch(editCode({ data }));

            // Clear data after submitted.
            // setCode("");
            // setStartDate(null);
            // setEndDate(null);
            // setAmount("");
            // setType("");
            // setLocation([]);
            // setService([])
            // setRedeemPerUser("");
            // setRedeemPerDay("");
            // setRedeemPerMonth("");
            setErrorMsg(null);
        }
        else {
            // console.log("Fail, please fill all of the required fields");
            setErrorMsg("Fail, please fill all of the required fields");
        }
        dispatch(getAllCode());
    };

    let tableData = {
        columns: [
            // {
            //     label: "ID",
            //     field: "id",
            //     sort: "desc"
            // },
            {
                label: "Discount code",
                field: "code",
            },
            {
                label: "Start Date",
                field: "start_date",
            },
            {
                label: "End Date",
                field: "end_date",
            },
            {
                label: "Redeem Per User",
                field: "redeem_per_user",
            },
            {
                label: "Redeem Per Day",
                field: "redeem_per_day",
            },
            {
                label: "Redeem Per Month",
                field: "redeem_per_month",
            },
            {
                label: "Discount Type",
                field: "type",
            },
            {
                label: "Amount",
                field: "amount",
            },
            // {
            //     label: "Location Use",
            //     field: "locationUse",
            // },
            {
                label: "Location",
                field: "location",
            },
            // {
            //     label: "Service Type Use",
            //     field: "serviceUse",
            // },
            {
                label: "Service Type",
                field: "service",
            },
            {
                label: "Action",
                field: "action"
            }
        ],
        rows: []
    };

    if (codeList.length) {
        for (let i = 0; i < codeList.length; i++) {
            const dataObject = {
                createdAt: codeList[i].createdAt,
                code: codeList[i].code,
                start_date: moment(new Date(codeList[i].start_date)).format('YYYY/MM/DD'),
                end_date: moment(new Date(codeList[i].end_date)).format('YYYY/MM/DD'),
                redeem_per_user: codeList[i].redeem_per_user !== 0 ? codeList[i].redeem_per_user : "-",
                redeem_per_day: codeList[i].redeem_per_day !== 0 ?  codeList[i].redeem_per_day: "-",
                redeem_per_month: codeList[i].redeem_per_month !== 0 ? codeList[i].redeem_per_month: "-",
                type: codeList[i].type === "Flat" ? `${codeList[i].type} (RM)` : `${codeList[i].type} (%)`,
                amount: codeList[i].amount,
                location: codeList[i].location.length ? codeList[i].location.join(', ') : "-",
                service: codeList[i].service.length ? codeList[i].service.join(', ') : "-",
                action: (
                    <div>
                        <i className="fas fa-edit ml-3" onClick={() => addCodeInfo(codeList[i])}></i>
                        {/* <i className="fas fa-trash-alt " onClick={() => removeCode(codeList[i].id)}></i> */}
                    </div>
                )
            };
            tableData.rows.push(dataObject);
        }
    }

    return (
        <div>
            <div style={{ padding: '1%', textAlign: 'right' }}>
                <Header />
                <br />
                <br />
                <br />
                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>DISCOUNT MANAGEMENT</div>
                <br />
                <button style={{ border: '1px solid black', background: 'white', width: '176px' }} onClick={handleOpen}>
                    New Code
                </button>
                <center>
                    {
                        codeList.length ? <MDBDataTable data={tableData} noBottomColumns striped hover responsive bordered /> :
                            (
                                <div className="text-center">
                                    <h1> - No Discount Code - </h1>
                                </div>
                            )
                    }
                </center>
            </div>
            <div>
                <Modal open={open} onClose={handleClose}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '4px' }}>
                        <Typography variant="h6">Enter Discount Code Details</Typography>
                        <br />
                        <form onSubmit={codeId ? updateCode : handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField label="Enter Discount Code Name" required value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={start_date}
                                        onChange={(date) => setStartDate(date)}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                    <br />
                                    <DatePicker
                                        label="End Date"
                                        value={end_date}
                                        onChange={(date) => setEndDate(date)}
                                        renderInput={(props) => <TextField {...props} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <br />
                            <TextField label="Discount Amount" required type="number" inputProps={{ min: 0 }} value={amount} onChange={(event) => setAmount(event.target.value)} disabled={disable} />
                            <br />
                            <FormControl>
                                <InputLabel>Discount Type</InputLabel>
                                <Select value={type} onChange={(event) => setType(event.target.value)} disabled={disable}>
                                    <MenuItem value="Rate">Rate (%)</MenuItem>
                                    <MenuItem value="Flat">Flat (RM)</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl>
                                <InputLabel>Service Type</InputLabel>
                                <Select multiple value={service} onChange={(event) => setService(event.target.value)} disabled={disable}>
                                    {categoryList.map(option => (
                                        <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl>
                                <InputLabel>Location</InputLabel>
                                <Select multiple value={location} onChange={(event) => setLocation(event.target.value)} disabled={disable}>
                                    {locationList.map(option => (
                                        <MenuItem key={option.id} value={option.location}>{option.location}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <TextField label="Redeem Per Day" type="number" inputProps={{ min: 0 }} value={redeem_per_day} onChange={(event) => setRedeemPerDay(event.target.value)} placeholder='Leave Empty For No Limit' />
                            <br />
                            <TextField label="Redeem Per Month" type="number" inputProps={{ min: 0 }} value={redeem_per_month} onChange={(event) => setRedeemPerMonth(event.target.value)} placeholder='Leave Empty For No Limit' />
                            <br />
                            <TextField label="Redeem Per User" type="number" inputProps={{ min: 0 }} value={redeem_per_user} onChange={(event) => setRedeemPerUser(event.target.value)} placeholder='Leave Empty For No Limit' />
                            <br />
                            {
                                errorMsg ?
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{ color: "red" }}>{errorMsg}</p>
                                    </div>
                                    :
                                    ""
                            }
                            {
                                error ?
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{ color: "red" }}>{error}</p>
                                    </div>
                                    : ""
                            }
                            {
                                message ?
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{ color: "green" }}>{message}</p>
                                    </div>
                                    :
                                    <Button variant="contained" type="submit" color="primary" style={{ marginTop: '10px' }}>
                                        Submit
                                    </Button>
                            }
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default DiscountManagement;
