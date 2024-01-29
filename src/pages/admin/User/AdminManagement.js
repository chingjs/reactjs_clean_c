import React, { useState } from 'react';
import Header from '../Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin, removeAdmin, verifyToken } from '../../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import AddAdminModal from './AddAdminModal'
import EditAdminModal from './EditAdminModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState();
    const { AdminList, admin } = useSelector((state) => state.adminReducer);


    // useEffect(() => {
    //     const adminCheck = localStorage.getItem('adminToken')
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        dispatch(getAdmin());
        // eslint-disable-next-line
    }, []);

    const handleEditModalOpen = (record) => {
        setEditData({ ...record, currentUser: admin.name });
        setEditModal(true);
    };

    const deleteAdmin = (id) => {
        // console.log('??????', id)
        dispatch(removeAdmin({ id, currentUser: admin.name }))
        dispatch(getAdmin());
    }
    const data = {
        columns: [
            // {
            //     field: 'date',
            //     label: 'Date',
            // },
            {
                field: 'username',
                label: 'Username',
            },
            {
                field: 'type',
                label: 'Type',
            },
            {
                field: 'email',
                label: 'Email',
            },
            {
                field: 'location',
                label: 'Location',
            },
            {
                field: 'status',
                label: 'Status',
            },
            {
                field: 'updatedAt',
                label: 'Last Updated Date',
            },
            {
                field: 'updatedBy',
                label: 'Last Updated By',
            },
            {
                field: 'actionEdit',
                label: "Action",
            }
        ],
        rows:
            AdminList && AdminList.map((data) => {
                // console.log(data);
                return {
                    ...data,
                    updatedAt: moment(new Date(data.updatedAt)).format('YYYY/MM/DD'),
                    status: data.status ? 'Active' : 'Inactive',
                    location: data.location.join(','),
                    actionEdit:
                        <div style={{ textAlign: 'center' }}                    >
                            <EditIcon onClick={(e) => handleEditModalOpen(data)} />
                            <DeleteIcon onClick={(e) => deleteAdmin(data.id)} />
                        </div>,
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
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>USER MANAGEMENT</div>
            <button style={{ border: '1px solid black', background: 'white', width: '176px' }}
                onClick={() => openModal()}>New User</button>
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
                    <AddAdminModal
                        addModal={addModal}
                        setAddModal={setAddModal}
                    />
                )
            }
            {
                editModal && (
                    <EditAdminModal
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

export default AdminManagement;
