import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import news1 from '../../assets/images/news1.jpg';
import news2 from '../../assets/images/news2.jpg';
import news3 from '../../assets/images/news3.jpg';
import arrowRight from '../../assets/images/arrow_right.png';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './welcome.css';

function SimpleDialog(props) {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      < Alert severity="error" >
        <AlertTitle>Error</AlertTitle>
        <strong>Please Scan the QR from Locker!</strong>
      </Alert >
    </Dialog>
  );
}

const breakPoints = [
  { width: 1, itemToShow: 1 },
  { width: 1000, itemToShow: 2 },
  { width: 1000, itemToShow: 3 },
  { width: 1200, itemToShow: 4 },
];
function Welcome() {
  const history = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const goWelcome = () => {
    // if (searchParams.get("lockercode")) {
    // localStorage.setItem("lockercode", searchParams.get("lockercode"));
    // const lockerId = localStorage.getItem("lockercode")
    // console.log("locker", lockerId)
    // axios.post("/api/locker/checklocker", { lockerId }).then((res) => {
    // if (!res.data) {
    // console.log("ok", res)
    // setOpen(true);
    // } else {
    // console.log("ok", res.data)
    // localStorage.setItem("location", res.data.location)
    // localStorage.setItem("lockercode", searchParams.get("lockercode"));
    history(`/customer/welcome`);
    // }
    // })
    // }
    // else {
    // setOpen(true);
    // }
  }
  return (
    <>
      <center>
        <div>
          <Carousel className="welcome-carousel" breakPoints={breakPoints}>
            <div>
              <img src={news1} alt="news1" className="pic-size" style={{ marginTop: '15%', height: '64vh',width:'100%' }}/>
              <p className="news-word1">
                More than 29 years of laundry experience
              </p>
              <p className="text">
                We have provided professional laundry services to customers in Malaysia since 1993.
              </p>
            </div>
            <div>
              <img src={news2} alt="news2" className="pic-size" style={{ marginTop: '15%', height: '64vh',width:'100%' }} />
              <p className="news-word1">
                Certified laundry expert
              </p>
              <p className="text">
                Our laundry expert is certified from the
                DryClearning & Laundry Institute USA (DLI.)
              </p>
            </div>
            <div className="news-pic-size">
              <img src={news3} alt="news3" className="pic-size" style={{ marginTop: '15%', height: '63vh',width:'100%' }} />
              <p className="news-word1">Cleaning guarantee</p>
              <p className="text">
                If you're unsatisfied with the cleaning quality, we will reclean it for free.
              </p>
            </div>
          </Carousel>
          <div>
            <img
              alt="arrowRight"
              src={arrowRight}
              className="welcome-button-right"
              height="55"
              onClick={() => {
                goWelcome()
              }}
            />
          </div>
          <SimpleDialog
            open={open}
            onClose={handleClose}
          />
        </div>
      </center>
    </>
  );
}

export default Welcome;
