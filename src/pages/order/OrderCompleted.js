import React from 'react';
import write from '../../assets/images/write-logo.png';
import remove from '../../assets/images/remove.png';
import { useNavigate } from 'react-router-dom';
import './order.css';

function OrderCompleted() {
    const history = useNavigate();
    const handleClose = () => {
        history('/customer/home');
    };

    return (
        <>
            <div className="body-order-placed">
                <div className="top-right-remove">
                    <img
                        src={remove}
                        alt="remove"
                        className="remove-adjust"
                        onClick={handleClose}
                    />
                </div>
                <div>
                    <center>
                        <div className="middle-body">
                            <img src={write} alt="write" />
                            <h1 className="success-order-placed">Success! Order Completed</h1>
                            <div className="order-placed-msg">
                                <p>
                                    Your order has been completed. You can check back the order history in the My Order.
                                </p>
                            </div>
                            <br />
                            <button
                                className="btn-order-placed"
                                onClick={() => history('/customer/myorder')}
                            >
                                Track Your Order
                            </button>
                        </div>
                    </center>
                </div>
            </div>
        </>
    );
}

export default OrderCompleted;
