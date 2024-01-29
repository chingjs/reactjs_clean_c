import './admin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React from 'react';
import {
  getAllLockerByLocation,
  openLocker,
  resetLocker,
} from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Layout/Header';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { MDBDataTable } from 'mdbreact';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LockerDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const lockerId = location.state;
  const { allLockerByLocation, lockerDetailsSummary } = useSelector(
    (state) => state.adminReducer
  );
  useEffect(() => {
    // console.log(lockerId);
    dispatch(getAllLockerByLocation({ lockerId }));
    // eslint-disable-next-line
  }, []);
  // console.log(allLockerByLocation);

  useEffect(() => {
    const socket = io({ auth: { roomId: 'admin' } });
    socket.on('locker-success', (data) => {
      console.log('socket front-end locker-success', data);

      dispatch(getAllLockerByLocation({ lockerId }));
    });

    return () => {
      socket.off('left');
    };
    // eslint-disable-next-line
  }, []);

  //   console.log(error);
  const resetLockerStatus = (data) => {
    dispatch(resetLocker({ id: data.id }));
    // dispatch(getAllLockerByLocation({ lockerId }));
  };
  const openLockerStatus = (data) => {
    dispatch(openLocker({ lockerId: data.name, location: data.location }));
    // dispatch(getAllLockerByLocation({ lockerId }));
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
        field: 'lock',
        label: 'Lock',
      },
      {
        field: 'empty',
        label: 'Empty',
      },
      {
        field: 'reserved',
        label: 'Reserved',
      },
      {
        field: 'booking',
        label: 'Booking',
      },
      {
        field: 'actionView',
        label: 'Action',
      },
    ],
    rows:
      allLockerByLocation && allLockerByLocation.length
        ? allLockerByLocation.map((data) => {
            return {
              ...data,
              location: data.location,
              lock: data.lock ? 'YES' : 'NO',
              empty: data.empty ? 'YES' : 'NO',
              reserved: data.reserved ? 'YES' : 'NO',
              booking: data.booking ? 'YES' : 'NO',
              actionView: (
                <>
                  <button
                    style={{ background: 'green' }}
                    onClick={() => openLockerStatus(data)}
                  >
                    <LockOpenIcon />
                  </button>{' '}
                  <button
                    style={{ background: 'yellow' }}
                    onClick={() => resetLockerStatus(data)}
                  >
                    <RestartAltIcon />
                  </button>
                </>
              ),
            };
          })
        : [],
  };

  return (
    <div style={{ padding: '1%' }}>
      <Header />
      <br />
      <br />
      {lockerDetailsSummary ? (
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
                <td className="locker-td">{lockerDetailsSummary.total}</td>
                <td className="locker-td">{lockerDetailsSummary.online}</td>
                <td className="locker-td">{lockerDetailsSummary.used}</td>
                <td className="locker-td">{lockerDetailsSummary.empty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
      <MDBDataTable
        striped
        bordered
        small
        info={false}
        noBottomColumns
        hover
        data={data}
      />
    </div>
  );
};

export default LockerDetails;
