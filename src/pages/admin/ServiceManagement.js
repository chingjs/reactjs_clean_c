import React, { useState } from 'react';
import ServiceEditModal from './ServiceEditModal';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '../../redux/actions/adminActions';
import { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Button } from '@mui/material';
import ServiceEditPricingModal from './ServiceEditPricingModal';
import ServiceDuplicateStrategy from './ServiceDuplicateStrategy';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editPricingModal, setEditPricingModal] = useState(false)
  const [duplicateModal, setDuplicateModal] = useState(false)
  const [editPricingData, setEditPricingData] = useState()
  // useEffect(() => {
  //   const adminCheck = localStorage.getItem('adminToken');
  //   if (!adminCheck) {
  //     navigate('/admin/login')
  //   }// eslint-disable-next-line
  // }, [])
  const [submit, setSubmit] = useState(false)
  const [serviceData, setServiceData] = useState();
  const { serviceList } = useSelector((state) => state.adminReducer);
  let strategyType = []
  const [filter, setFilter] = useState({
    strategy: ''
  })
  const data = {
    columns: [
      {
        field: 'name',
        label: 'Item Name',
      },
      {
        field: 'strategy',
        label: 'Pricing Strategy',
      },
      {
        field: 'category',
        label: 'Category',
      },
      {
        field: 'price',
        label: 'Price',
      },
      {
        field: 'images',
        label: 'Image',
      },
      {
        field: 'createdAt',
        label: 'Created At',
      },
      {
        field: 'status',
        label: 'Status',
      }, {
        field: 'actionEdit',
        label: "Action",
      }

    ],
    rows: serviceList &&
      serviceList.map((data) => {
        return {
          ...data,
          actionEdit: <button onClick={(e) => handleModalOpen(data)} >Update</button>,
          desc: data.desc ? data.desc : '-',
          price: 'RM ' + data.price,
          status: data.status ? 'Active' : 'Inactive',
          // images: data.images.length && data.images.map((img,idx) => <img key={idx} src={img} alt='' height='70' width='auto' />),
          images: data.photo_url ? <img src={data.images} alt='' height='70' width='auto' /> : '-',
          category: data.service_type.name,
          createdAt: moment(new Date(data.createdAt)).format('YYYY/MM/DD')
        };
      })
  }
  // console.log('checklist', serviceList);
  useEffect(() => {
    if (!serviceList.length && !submit)
      dispatch(getAllService());
    const type = serviceList.map(a => a.strategy)
    for (let t = 0; t < type.length; t++) {
      if (!strategyType.includes(type[t])) {
        strategyType.push(type[t])
      }
    }
    setSubmit(true)
    // eslint-disable-next-line
  }, [serviceList, submit]);
  const [editModal, setEditModal] = useState(false);

  const handleModalOpen = (record) => {
    setServiceData(record);
    // console.log('checkrecord', record);
    setEditModal(true);
  };
  const goFilter = (e) => {
    e.preventDefault();
    dispatch(getAllService(filter));
  }
  const goReset = (e) => {
    window.location.reload(true)
  }
  const openEditPricing = () => {
    setEditPricingData(strategyType)
    setEditPricingModal(true)
  }
  const openDuplicate = () => {
    setEditPricingData(strategyType)
    setDuplicateModal(true)
  }

  return (
    <div style={{ padding: '1%', textAlign: 'right' }}>
      <Header />
      <br />
      <br />
      <br />
      <center><p style={{ fontWeight: 'bold', fontSize: '25px' }}>Item Type Management</p>
        <Autocomplete
          multiple
          options={strategyType}
          getOptionLabel={(option) => option}
          onChange={(e, a) => setFilter({ ...filter, strategy: a })}
          style={{ marginTop: '10px', width: 460 }}
          renderInput={(params) => (
            <TextField {...params} label="Pricing Strategy" />
          )}
        />
        {' '}
        <Button variant="outlined" style={{ marginTop: '10px', height: '45px', width: '230px' }} onClick={(e) => goFilter(e)}>Filter</Button> {' '}
        <Button variant="outlined" style={{ marginTop: '10px', height: '45px', width: '230px' }} onClick={(e) => goReset(e)}>Reset</Button>

      </center>
      <button style={{ border: '1px solid black', background: 'white', width: '176px', fontSize: '15px' }}
        onClick={(e) => openDuplicate()}>Duplicate</button> {' '}
      <button style={{ border: '1px solid black', background: 'white', width: '176px', fontSize: '15px' }}
        onClick={(e) => openEditPricing()}>Update Pricing</button>
      <MDBDataTable
        striped
        bordered
        info={false}
        small
        hover
        data={data}
        noBottomColumns
      />
      {
        editModal && (
          <ServiceEditModal
            data={serviceData}
            editModal={editModal}
            setEditModal={setEditModal}
          />
        )
      }
      {
        editPricingModal && (
          <ServiceEditPricingModal
            editModal={editPricingModal}
            setEditModal={setEditPricingModal}
            setEditData={setEditPricingData}
            editData={editPricingData}
          />
        )
      }
      {
        duplicateModal && (
          <ServiceDuplicateStrategy
            editModal={duplicateModal}
            setEditModal={setDuplicateModal}
            setEditData={setEditPricingData}
            editData={editPricingData}
          />
        )
      }
    </div >
  );
};

export default ServiceManagement;
