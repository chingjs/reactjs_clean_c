import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UnlockMessage from './UnlockMessage';
import CollectMessage from './CollectMessage';

function LoadingLocker() {
    const location = useLocation();
    const lockerData = location.state
    localStorage.setItem('location', lockerData.location)
    const [collectState, setCollectState] = useState(true);
    const [unlockState, setUnlockState] = useState(true);
    // const data ={
    //     Authorization : process.env.lockerENV
    // }
    return (
        <>
            <div className='background' >
                {location.state.type !== 'collect' ?
                    <UnlockMessage data={lockerData} unlockState={unlockState} setUnlockState={setUnlockState} />
                    : <CollectMessage data={lockerData} unlockState={collectState} setUnlockState={setCollectState} />}
            </div>
        </>)
}
export default LoadingLocker;