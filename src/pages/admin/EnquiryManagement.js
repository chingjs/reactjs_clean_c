import React, { useState } from 'react';
import EnquiryEditModal from './EnquiryEditModal';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEnquiry , verifyToken} from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';

const EnquiryManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   } dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, [])

  const [enquiryData, setEnquiryData] = useState();
  const { enquiry } = useSelector((state) => state.adminReducer);
  const data = {
    columns: [
      {
        field: 'date',
        label: 'Date',
      },
      {
        field: 'orderId',
        label: 'Order ID',
      },
      {
        field: 'full_name',
        label: 'Name',
      },
      {
        field: 'phone_number',
        label: 'Phone',
      },
      {
        field: 'email',
        label: 'Email',
      },

      {
        field: 'msg',
        label: 'Message',
      },
      {
        field: 'status',
        label: 'Status',

      }, {
        field: 'actionEdit',
        label: "Action",
      }
    ],
    rows:
      enquiry && enquiry.map((data) => {
        return {
          // ...data,
          full_name: data.full_name,
          phone_number: data.phone_number,
          email: data.email,
          // subject: data.subject,
          msg: data.message,
          orderId: data.orderId ? data.orderId : '-',
          status: data.status ? 'Processed' : 'Pending',
          actionEdit: <button onClick={(e) => handleModalOpen(data)} >Update</button>,
          date: moment(new Date(data.createdAt)).format('YYYY/MM/DD'),
        };
      })
  }

  // console.log("checkrecord", enquiry)
  useEffect(() => {
    dispatch(getAllEnquiry());

    // eslint-disable-next-line
  }, []);
  const [editModal, setEditModal] = useState(false);

  const handleModalOpen = (record) => {
    setEnquiryData(record);
    setEditModal(true);
  };


  return (
    <div style={{ padding: '1%', textAlign: 'right' }}>
      <Header />
      <br />
      <br />
      <MDBDataTable
        // striped
        bordered
        small
        hover
        info={false}
        noBottomColumns
        data={data} />

      {editModal && (
        <EnquiryEditModal
          data={enquiryData}
          editModal={editModal}
          setEditModal={setEditModal}
        />
      )}
    </div>
  );
};

export default EnquiryManagement;
