import React from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getSMS, verifyToken } from '../../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';


const SMSManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { SMSList } = useSelector((state) => state.adminReducer);


    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken')
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        dispatch(getSMS());
        // eslint-disable-next-line
    }, []);
    // console.log(SMSList)
    let data = {
        columns: [
            {
                field: 'created',
                label: 'Time',
            },
            {
                field: 'type',
                label: 'Type',
            },
            {
                field: 'number',
                label: 'phone_number',
            },
            {
                field: 'messageof',
                label: 'Message',
            },
        ],
        rows:
            SMSList
            && SMSList.map((data) => {
                return {
                    ...data,
                    type: data.type.toUpperCase(),
                    created: moment(new Date(data.createdAt)).format('YYYY/MM/DD HH:mm'),
                };
            })
    }
    return (
        <div style={{ padding: '1%' }}>
            <Header />
            <br />
            <br />
            <br />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>SMS MANAGEMENT</div>
            <MDBDataTable
                striped
                bordered
                small
                hover
                noBottomColumns
                data={data} />

        </div >
    );
};

export default SMSManagement;
