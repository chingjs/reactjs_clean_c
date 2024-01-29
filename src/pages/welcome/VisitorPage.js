import './welcome.css';

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import welcome from '../../assets/welcome/signin-welcome.png';

function VisitorPage() {
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const lockerId = searchParams.get('locker');

  useEffect(() => {
    if (lockerId) {
      axios.post('/api/locker/checklocker', { lockerId }).then((res) => {
        if (res) {
          console.log('ok', res);
          localStorage.setItem('lockerId', res.data.id);
        }
      });
    } else {
      localStorage.removeItem('lockerId');
    }
    // eslint-disable-next-line
  }, [lockerId]);

  const goSignIn = () => {
    history('/customer/login');
  };
  const goRegister = () => {
    history('/customer/register');
  };
  return (
    <>
      <br />
      <br />
      <center>
        <div className="height">
          <div className="welcome-word1">
            <p>Let's Get Started</p>
          </div>
          <div className="welcome-word2">
            <p>Get your laundry done by a professional and </p>
            <p>experienced laundry company since 1993</p>
          </div>
          <img src={welcome} alt="welcome" className="responsive" />
          <div style={{ marginTop: '15%' }}>
            <button className="welcome-button1" onClick={() => goSignIn()}>
              Sign In
            </button>
            <div className="welcome-word2">
              <p>Or</p>
            </div>
            <button className="welcome-button2" onClick={() => goRegister()}>
              Create account
            </button>
          </div>
        </div>
      </center>
    </>
  );
}

export default VisitorPage;
