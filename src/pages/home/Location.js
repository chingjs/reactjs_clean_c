import React, { useEffect, useState } from 'react';
import backArrow from '../../assets/images/back-arrow.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLocationList } from '../../redux/actions/userActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Location() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        state: '',
        city: '',
        lockerId: '',
        location: '',
        name: ''
    });
    const [nameList, setNameList] = useState({ options: [], loading: false });

    const handleBack = () => {
        history('/customer/home');
    };
    const { locationList } = useSelector((state) => state.userReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getLocationList());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (locationList && locationList.length && !nameList.options.length) {
            const filterName = locationList && locationList.map((j) => j.name);
            setNameList({ options: filterName, loading: true });
        }  // eslint-disable-next-line
    }, [locationList])

    const setFilterData = (name) => {
        const filterData = locationList.filter((j) => j.name === name)[0];
        setData({ ...data, lockerId: filterData.id, location: filterData.location, strategy: filterData.strategy, name: filterData.name })
    }
    const goNext = () => {
        history('/customer/home2', {
            state: data,
        })
    }
    return (
        <>
            <div className="home2-arrowback">
                <img src={backArrow} alt="backArrow" className='arrowbutton' onClick={handleBack} />
            </div>
            <p className="home-word2">Location</p>
            <div className="home-body-btm-main">
                <center>
                    <br /><br />
                    <p className="home-word3">Please choose a Location </p>
                    {/* <p className="home-word3">today?</p> */}
                    <br />
                    <div style={{ width: '70%', marginTop: '10%' }}>
                    </div>
                    {data.state ? <div style={{ width: '70%', marginTop: '10%' }}>
                    </div> : null}
                    <div style={{ width: '70%', marginTop: '10%' }}>
                         <div className="washingandirontext">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Branch Name</InputLabel>
                                <Select label='Branch' value={data.name} onChange={(e) => setFilterData(e.target.value)}>
                                    {nameList.options && nameList.options.map((j, idx) => (
                                        <MenuItem key={idx} value={j}>{j}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{ marginTop: '15%' }}>
                        <button
                            className="location-button1"
                            onClick={() => goNext()}
                            type="submit"
                        >
                            Continue
                        </button>
                    </div>
                                    </center>
            </div >
        </>
    );
}

export default Location;
