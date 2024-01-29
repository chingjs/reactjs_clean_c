import React, { useState } from 'react';
import UnlockMessage from './UnlockMessage';
import { useNavigate } from 'react-router-dom';

function LoadingLocker() {
  const [unlockState, setUnlockState] = useState(true);
  const history = useNavigate();
  const goSuccess = () => {
    history('/driver/success');
  };
  return (
    <>
      <div className="background">
        <UnlockMessage
          lockerId={localStorage.getItem('operator_lockerId')}
          unlockState={unlockState}
          setUnlockState={setUnlockState}
          goSuccess={goSuccess}
        />
      </div>
    </>
  );
}
export default LoadingLocker;
