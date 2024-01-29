import './admin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { useEffect, useState } from 'react';
import { getAllLocker, verifyToken } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

import EditLockerStatus from './EditLockerStatus';
import Header from './Layout/Header';
import { MDBDataTable } from 'mdbreact';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const LockerStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ strategy: '' });

  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login');
  //   }
  //   dispatch(verifyToken({ token: adminCheck }));
  //   // eslint-disable-next-line
  // }, []);

  const { admin, lockerSummary, location } = useSelector(
    (state) => state.adminReducer
  );

  const openEditModal = (data) => {
    // console.log('editlocker', data)
    setEditData(data);
    setEditModal(true);
  };
  const data = {
    columns: [
      {
        field: 'location',
        label: 'Location',
      },
      {
        field: 'name',
        label: 'Name',
      },
      {
        field: 'totallocker',
        label: 'Total',
      },
      {
        field: 'emptylocker',
        label: 'Empty',
      },
      {
        field: 'usedlocker',
        label: 'Used',
      },
      {
        field: 'city',
        label: 'City',
      },
      {
        field: 'postcode',
        label: 'Postcode',
      },
      {
        field: 'address',
        label: 'Address',
      },
      {
        field: 'strategy',
        label: 'Pricing Strategy',
      },
      {
        field: 'status',
        label: 'Status',
      },
      {
        field: 'actionView',
        label: 'Action',
      },
    ],
    rows: lockerSummary
      ? lockerSummary.map((data, idx) => {
          // console.log("locker: ", data.id)
          return {
            ...data,
            totallocker: lockerSummary[idx].total,
            onlinelocker: lockerSummary[idx].online,
            usedlocker: lockerSummary[idx].used,
            emptylocker: lockerSummary[idx].empty,
            status: data.status ? 'Online' : 'Offline',
            actionView: (
              <div>
                <button
                  onClick={(e) =>
                    navigate('/admin/locker/details', { state: data.id })
                  }
                >
                  View
                </button>{' '}
                <button onClick={(e) => openEditModal(data)}>Update</button>
              </div>
            ),
          };
        })
      : [],
  };

  useEffect(() => {
    if (admin) {
      const sendData = {
        name: admin && admin.name,
        location,
      };
      dispatch(getAllLocker(sendData));
    }

    // setSubmit(true)

    // dispatch(getLockerSummary());
    // eslint-disable-next-line
  }, [admin]);

  const filtertotal = lockerSummary
    .map((r) => r.total)
    .reduce((a, b) => a + b, 0);
  const filteronline = lockerSummary
    .map((r) => r.online)
    .reduce((a, b) => a + b, 0);
  const filterused = lockerSummary
    .map((r) => r.used)
    .reduce((a, b) => a + b, 0);
  const filterempty = lockerSummary
    .map((r) => r.empty)
    .reduce((a, b) => a + b, 0);

  // socket.io listener
  useEffect(() => {
    const socket = io({ auth: { roomId: 'admin' } });
    socket.on('locker-success', (data) => {
      console.log('socket front-end locker-success', data);
      if (data && admin) {
        const sendData = {
          name: admin && admin.name,
          location,
        };
        dispatch(getAllLocker(sendData));
      }
    });

    return () => {
      socket.off('left');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      <div className="app-container">
        <table className="locker-table">
          <thead>
            <tr>
              <th className="locker-td">Total Lockers</th>
              <th className="locker-td">Total Online Locker</th>
              <th className="locker-td">Total Occupied Slots</th>
              <th className="locker-td">Total Available Slots</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="locker-td">{filtertotal}</td>
              <td className="locker-td">{filteronline}</td>
              <td className="locker-td">{filterused}</td>
              <td className="locker-td">{filterempty}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <MDBDataTable
        striped
        bordered
        info={false}
        small
        noBottomColumns
        hover
        data={data}
      />
      {editModal && (
        <EditLockerStatus
          editModal={editModal}
          setEditModal={setEditModal}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </div>
  );
};

export default LockerStatus;
