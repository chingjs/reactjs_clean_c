import React, { useState } from 'react';
import OperatorEditModal from './OperatorEditModal';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getOperatorList, verifyToken } from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';

const OperatorManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, [])
  const [operatorData, setOperatorData] = useState();
  const { operatorList } = useSelector((state) => state.adminReducer);
  const data = {
    columns: [
      {
        field: 'oid',
        label: 'Driver ID',
        sort: 'asc',
      },
      {
        field: 'full_name',
        label: 'Full Name',
      },
      {
        field: 'phone_number',
        label: 'Phone Number',
      },
      {
        field: 'email',
        label: 'Email',
      },
      {
        field: 'createdDate',
        label: 'Join Date',
      },
      {
        field: 'status',
        label: 'Status',
      },
      {
        field: 'createdBy',
        label: 'Created By',
      },
      {
        field: 'updatedBy',
        label: 'Updated By',
      },
      {
        field: 'actionEdit',
        label: "Action",
      }
    ],
    rows:
      operatorList &&
      operatorList.map((data) => {
        return {
          ...data,
          actionEdit: <button onClick={(e) => handleModalOpen(data)} >Update</button>,
          createdDate: moment(new Date(data.createdAt)).format('YYYY-MM-DD'),
        };
      }),
  }

  // console.log('checklist', operatorList);
  useEffect(() => {
    if(operatorList.length === 0)
    dispatch(getOperatorList({ status: 'Active' }));
    // eslint-disable-next-line
  }, []);
  const [editModal, setEditModal] = useState(false);

  const handleModalOpen = (record) => {
    setOperatorData(record);
    // console.log('checkrecord', record);
    setEditModal(true);
  };
  return (
    <div style={{ padding: '1%', textAlign: 'right' }}>
      <Header />
      <br />
      <br />
      <br />
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>DRIVER MANAGEMENT</div>


      <MDBDataTable
        striped
        bordered
        info={false}
        small
        hover
        noBottomColumns
        data={data}
      />

      {editModal && (
        <OperatorEditModal
          data={operatorData}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
    </div>
  );
};

export default OperatorManagement;
