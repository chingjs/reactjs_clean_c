import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getMDR, removeMDR } from '../../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import AddMDRModal from './AddMDRModal'
import EditMDRModal from './EditMDRModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Merchant Discount Rate MDR
const MDRManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState();
    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken');
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }// eslint-disable-next-line
    // },[])
    const { MDRList } = useSelector((state) => state.adminReducer);

    useEffect(() => {
        dispatch(getMDR());
        // eslint-disable-next-line
    }, []);

    const handleEditModalOpen = (record) => {
        setEditData(record);
        setEditModal(true);
    };

    const deleteMDR = (id) => {
        dispatch(removeMDR({ id }))
        MDRList.filter(a => a.id === id)
    }
    const data = {
        columns: [
            // {
            //     field: 'date',
            //     label: 'Date',
            // },
            {
                field: 'name',
                label: 'Name',
            },
            {
                field: 'rate',
                label: 'Rate (%)',
            },
            {
                field: 'min',
                label: 'Minimum Amount (RM)',
            },
            {
                field: 'fixed',
                label: 'Fixed Rate (RM)',
            },
            {
                field: 'updatedAt',
                label: 'Last Updated Date',
            },
            {
                field: 'note',
                label: 'Note',
            },
            {
                field: 'actionEdit',
                label: "Action",
            }
        ],
        rows:
            MDRList && MDRList.map((data) => {
                return {
                    ...data,
                    updatedAt: moment(new Date(data.updatedAt)).format('YYYY/MM/DD'),
                    actionEdit: <div style={{ textAlign: 'center' }}><EditIcon onClick={(e) => handleEditModalOpen(data)} /> <DeleteIcon onClick={(e) => deleteMDR(data.id)} /></div>,
                };
            })
    }
    const openModal = () => {
        setAddModal(true)
    }

    return (
        <div style={{ padding: '1%', textAlign: 'right', }}>
            <Header />
            <br />
            <br />
            <br />
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>MERCHANT DISCOUNT RATE MANAGEMENT</div>
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
                    <AddMDRModal
                        addModal={addModal}
                        setAddModal={setAddModal}
                    />
                )
            }
            {
                editModal && (
                    <EditMDRModal
                        editModal={editModal}
                        setEditModal={setEditModal}
                        editData={editData}
                        setEditData={setEditData}
                    />
                )
            }
        </div >
    );
};

export default MDRManagement;
