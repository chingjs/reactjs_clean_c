import React, { useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getReschedule, verifyToken, getLocationList } from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import RescheduleAddModal from './RescheduleAddModal';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button } from '@mui/material';

const RescheduleManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);
    const { rescheduleList, admin, location, locationList } = useSelector((state) => state.adminReducer);

    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken');
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     dispatch(getLocationList())
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        if (admin && admin.name) {
            const sendData = {
                name: admin && admin.name,
                location
            }

            dispatch(getReschedule(sendData));
        }
        // eslint-disable-next-line
    }, [admin]);

    const [filter, setFilter] = useState({
        startDate: "",
        endDate: new Date(),
        location: [],
    })

    const locationOpt = locationList.map(option => option.location)

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
                field: 'phone_number',
                label: 'Phone Number',
            },
            {
                field: 'olddate',
                label: 'Old Date',
            },
            {
                field: 'newdate',
                label: 'New Date',
            },
            {
                field: 'reason',
                label: 'Reason',
            },
            {
                field: 'createdBy',
                label: 'Created By',
            },
            {
                field: 'taskId',
                label: 'Task ID',
            },
            {
                field: 'driverName',
                label: 'Driver Name',
            },
            {
                field: 'collectLockerId',
                label: 'Collect Locker ID',
            },
        ],
        rows:
            rescheduleList && rescheduleList.map((data) => {
                return {
                    ...data,
                    date: moment(new Date(data.createdAt)).format('YYYY/MM/DD'),
                    olddate: moment(new Date(data.olddate)).format('YYYY/MM/DD'),
                    newdate: moment(new Date(data.newdate)).format('YYYY/MM/DD'),
                };
            })
    }
    const openModal = () => {
        setAddModal(true)
    }

    // console.log("checkrecord", enquiry)
    const goFilter = (e) => {
        e.preventDefault();
        const sendData = {
            ...filter,
            name: admin && admin.name,
            //   status: status ? status : 'active',
            location: location[0] ? location : filter.location
        }
        dispatch(getReschedule(sendData));
    }

    return (
        <div style={{ padding: '1%', textAlign: 'right', }}>
            <Header />
            <br />
            <br />
            <br />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>RESCHEDULE COLLECTION MANAGEMENT</div>
            <br />
            <center>
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
            <button style={{ border: '1px solid black', background: 'white', width: '176px' }}
                onClick={() => openModal()}>New Record</button>

            <MDBDataTable
                style={{ textAlign: 'right' }}
                striped
                info={false}
                bordered
                small
                hover
                noBottomColumns
                data={data} />
            {
                addModal && (
                    <RescheduleAddModal
                        addModal={addModal}
                        setAddModal={setAddModal}
                    />
                )
            }
        </div >
    );
};

export default RescheduleManagement;
