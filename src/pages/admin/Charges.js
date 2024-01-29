import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, createCharges, getChargesOrderID, clearError } from '../../redux/actions/adminActions';
import { Paper, Grid, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const Charges = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     dispatch(clearError());
    //     const adminCheck = localStorage.getItem('adminToken');
    //     if (!adminCheck) {
    //         navigate('/admin/login')
    //     }
    //     dispatch(verifyToken({ token: adminCheck }));
    //     // eslint-disable-next-line
    // }, [])
    const paperStyle = { padding: '30px 20px', width: 500, margin: "130px auto" }
    const [chargeData, setChargeData] = useState({
        orderNo: '',
        action: '',
        amount: '',
        chargeName: '',
        category: '',
        newItem: '',
        oldItem: '',
        removeItem: '',
        qty: 0,

    });
    const { admin, message, error, orderList, location } = useSelector((state) => state.adminReducer);
    // console.log(orderList)
    const headerStyle = { margin: 0 }
    const handleSubmit = (e) => {
        dispatch(clearError());
        e.preventDefault();
        const sendData = {
            ...chargeData,
            adminName: admin && admin.name,
        }
        dispatch(createCharges(sendData));
    };
    const [list, setList] = useState({ options: [], loading: false });
    const [detailList, setDetailList] = useState({ options: [], loading: false });
    const [itemList, setItemList] = useState({ options: [], loading: false });
    const [newItemList, setNewItemList] = useState({ options: [], loading: false });
    const [fabricList, setFabricList] = useState({ options: [], loading: false });
    const [categoryList, setCategoryList] = useState({ options: [], loading: false });
    const [orderIndex, setOrderIndex] = useState({ options: [], loading: false });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(clearError());
        if (admin && admin.name) {
            const sendData = {
                name: admin && admin.name,
                location
            }
            dispatch(getChargesOrderID(sendData))
        }
        // eslint-disable-next-line
    }, [admin])

    useEffect(() => {
        dispatch(clearError());
        if (orderList) {
            setList({ options: orderList.order, loading: true });
            setDetailList({ options: orderList.item, loading: true })
            setFabricList({ options: orderList.fabric, loading: true })
            setCategoryList({ options: orderList.category, loading: true })
            // setAmountList({ options: orderList.category, loading: true })
        } // eslint-disable-next-line
    }, [orderList]);

    const updateOrderItem = (id) => {
        // console.log('id', id)
        setChargeData({ ...chargeData, orderNo: id, category: '', newItem: '', oldItem: '', action: '' })
        const getItem = detailList.options.filter(b => b.orderId === id)
        setItemList({ options: getItem, loading: true })
        setOrderIndex(id)

    }
    const updateAction = (e) => {
        setChargeData({ ...chargeData, action: e, category: '', newItem: '', oldItem: '', amount: '' })
        const getItem = detailList.options.filter(b => b.orderNo === chargeData.orderNo)
        setItemList({ options: getItem, loading: true })
    }
    const updateCategoryItem = (cate) => {
        setChargeData({ ...chargeData, category: cate, newItem: '' })
        const getItem = fabricList.options.filter(b => b.serviceTypeId === cate)
        setNewItemList({ options: getItem, loading: true })
    }

    return (
        <div>
            <Header />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2 style={headerStyle}>Create Charges</h2>
                        <br />
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel>Order ID</InputLabel>
                            <Select fullWidth required value={chargeData.orderNo}
                                onChange={(e) => updateOrderItem(e.target.value)} label='Order ID' id='id' >
                                {list.options &&
                                    list.options.map((data, idx) => (
                                        <MenuItem key={idx} value={data.oid}>{data.oid}</MenuItem>
                                    ))}     </Select>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel>Action</InputLabel>
                            <Select
                                required
                                value={chargeData.action}
                                label="Order ID"
                                onChange={(e) => updateAction(e.target.value)}
                            >
                                <MenuItem value='add'>Add Payment</MenuItem>
                                <MenuItem value='foc'>FOC</MenuItem>
                                <MenuItem value='refund'>Refund</MenuItem>
                                <MenuItem value='addnew'>Add New Item</MenuItem>
                                <MenuItem value='changeitem'>Change Item</MenuItem>
                                <MenuItem value='cancel'>Cancel Order</MenuItem>
                                <MenuItem value='removeItem'>Remove Item</MenuItem>
                            </Select>
                        </FormControl>

                        {chargeData.action === 'add' ?
                            <><br />
                                <br />
                                <TextField fullWidth required value={chargeData.chargeName} type='text'
                                    onChange={(e) => setChargeData({ ...chargeData, chargeName: e.target.value })} label='Item Name' placeholder="Item Name" />
                                <br />
                                <br />
                                <TextField fullWidth required value={chargeData.amount} type='number'
                                    onChange={(e) => setChargeData({ ...chargeData, amount: e.target.value })} label='Amount' placeholder="Amount" />
                            </> : null}
                        <br />
                        <br />
                        {chargeData.action === 'changeitem' ? <div> <FormControl fullWidth>
                            <InputLabel >Old Item</InputLabel>

                            <Select fullWidth required value={chargeData.oldItem}
                                onChange={(e) => setChargeData({ ...chargeData, oldItem: e.target.value })} label='Old Item' id='oldItem' >
                                {itemList.options &&
                                    itemList.options.map((data, idx) => (
                                        <MenuItem key={idx} value={data.item}>{data.item} - (RM {data.price})</MenuItem>
                                    ))}     </Select>
                        </FormControl> <br /><br /></div>
                            : ''}

                        {chargeData.action === 'removeItem' ? <div> <FormControl fullWidth>
                            <InputLabel >Current Items</InputLabel>

                            <Select fullWidth required value={chargeData.removeItem}
                                onChange={(e) => setChargeData({ ...chargeData, removeItem: e.target.value })} label='Remove Item' id='removeItem' >
                                {itemList.options &&
                                    itemList.options.map((data, idx) => (
                                        <MenuItem key={idx} value={data.fabricId}>{data.item} - (RM {data.price})</MenuItem>
                                    ))}
                            </Select>
                        </FormControl> <br /><br /></div>
                            : ''}

                        {chargeData.action === 'refund' ? <div> <FormControl fullWidth>
                            <TextField
                                fullWidth
                                required
                                type='number'
                                value={chargeData.amount}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const maxPrice = list.options.filter(b => b.oid === orderIndex)[0]?.price;

                                    if (inputValue <= maxPrice) {
                                        setChargeData({ ...chargeData, amount: inputValue });
                                        setErrorMessage('');
                                    } else {
                                        setErrorMessage('Amount cannot exceed the maximum price.');
                                    }
                                }}
                                label='Amount'
                                placeholder='Amount'
                                max={list.options.filter(b => b.oid === orderIndex)[0]?.price}
                                error={!!errorMessage}
                                helperText={errorMessage}
                            />

                        </FormControl> <br /><br /></div>
                            : ''}

                        {chargeData.action === 'addnew' || chargeData.oldItem ? <div>
                            <FormControl fullWidth>
                                <InputLabel>New Item Category</InputLabel>
                                <Select fullWidth required value={chargeData.category}
                                    onChange={(e) => updateCategoryItem(e.target.value)} label='New Item Category' id='newItem' >
                                    {categoryList.options &&
                                        categoryList.options.map((data, idx) => (
                                            <MenuItem key={idx} value={data.id}>{data.name}</MenuItem>
                                        ))}     </Select>
                            </FormControl>
                            <br /><br />
                            <FormControl fullWidth>
                                <InputLabel>New Item Type</InputLabel>
                                <Select fullWidth required value={chargeData.newItem}
                                    onChange={(e) => setChargeData({ ...chargeData, newItem: e.target.value })} label='New Item Type' id='newItem' >
                                    {newItemList.options &&
                                        newItemList.options.map((data, idx) => (
                                            <MenuItem key={idx} value={data.id}>{data.name} - (RM {data.price})</MenuItem>
                                        ))}     </Select>
                            </FormControl> <br /><br />
                            <TextField fullWidth required value={chargeData.qty} type='number'
                                onChange={(e) => setChargeData({ ...chargeData, qty: e.target.value })} label='Quantity' placeholder="Quantity" /> <br /><br /></div>
                            : ''}
                        <TextField fullWidth required value={chargeData.reason}
                            onChange={(e) => setChargeData({ ...chargeData, reason: e.target.value })} multiline rows={3} label='Reason' placeholder="Enter the reason" />

                        <center>
                            <div className="admin-error">{message ? <div className="admin-success-msg">{message} </div> : error}</div>
                            <br />
                        </center>
                        {message ? '' : <button type='submit' className="admin-create-input" variant='contained' >Create</button>}
                    </form>
                </Paper>
            </Grid>
        </div >
    );
};

export default Charges;
