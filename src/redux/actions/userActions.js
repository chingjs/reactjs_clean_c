import {
  CANCEL_ORDER,
  CHANGE_PAGE,
  CHECK_ONE_LOCKER,
  CHECK_USER_CODE,
  CLEAR_ERROR,
  CLEAR_LOGIN_ERROR,
  COMPLETE_ORDER,
  EDIT_PROFILE,
  GET_COLLECT_ORDER,
  GET_CURRENT_ORDER,
  GET_DEPOSIT_ORDER,
  GET_EMPTY_LOCKER,
  GET_INBOX,
  GET_LOCATION,
  GET_PAST_ORDER,
  GET_PAYMENT_ORDER,
  GET_PROFILE,
  GET_SERVICE_PRICE,
  GET_SMALL_LOCKER,
  GET_UNREAD,
  IS_LOADED,
  IS_LOADING,
  LOG_OUT,
  MAKE_PAYMENT,
  NEW_LOCKER_GETALL,
  NEW_LOCKER_UNLOCK,
  OPEN_LOCKER,
  ORDER_CREATE,
  READ_MESSAGE,
  RESEND_OTP,
  RESET_PASSWORD,
  SAVE_OPERATORID,
  SEND_SUPPORT,
  SHOW_ERROR,
  SYNC_LOCKER,
  UPDATE_LOCKER_RESERVED,
  USER_LOGIN,
  USER_REGISTERED,
} from '../types';

import axios from 'axios';

// change page
export const changePage = (data) => {
  return {
    type: CHANGE_PAGE,
    payload: data,
  };
};

// register
export const registerUser = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/signup', data)
    .then((res) => {
      dispatch({ type: USER_REGISTERED, payload: res.data });
    })
    .catch((err) => {
      console.log('errorRegister', err);
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// verifyOtp
export const verifyOtp = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/verifyOtp', data)
    .then((res) => {
      dispatch({ type: USER_LOGIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// login
export const loginUser = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/auth/login', data)
    .then((res) => {
      dispatch({ type: USER_LOGIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// getProfile
export const getProfile = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/view', data)
    .then((res) => {
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

//editProfile
export const editProfile = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/details/edit', data)
    .then((res) => {
      dispatch({ type: EDIT_PROFILE, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

// createOrder
export const createOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/create', data)
    .then((res) => {
      dispatch({ type: ORDER_CREATE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get past Order
export const getPastOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getPastOrder', data)
    .then((res) => {
      dispatch({ type: GET_PAST_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get current Order
export const getCurrentOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getCurrentOrder', data)
    .then((res) => {
      dispatch({ type: GET_CURRENT_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response });
    });
};

// get collect Order
export const getCollectOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getCollectOrder', data)
    .then((res) => {
      dispatch({ type: GET_COLLECT_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getPaymentOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getPaymentOrder', data)
    .then((res) => {
      dispatch({ type: GET_PAYMENT_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getDepositOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getDepositOrder', data)
    .then((res) => {
      dispatch({ type: GET_DEPOSIT_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const depositItem = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/details/updateDeposit', data)
    .then((res) => {
      dispatch({ type: GET_DEPOSIT_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getRepayment = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/makePayment', data)
    .then((res) => {
      dispatch({ type: MAKE_PAYMENT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};


// get empty Locker from db
export const getAvailableLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/checkemptylocker', data)
    .then((res) => {
      dispatch({ type: GET_EMPTY_LOCKER, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

// get empty Locker from db
export const getSmallLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/checksmalllocker', data)
    .then((res) => {
      dispatch({ type: GET_SMALL_LOCKER, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response });
      dispatch({ type: IS_LOADED });
    });
};

// get 1 Locker
export const getOneLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/checkonelocker', data)
    .then((res) => {
      dispatch({ type: CHECK_ONE_LOCKER, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

// update locker reserved true
export const updateReserved = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/updateReserved', data)
    .then((res) => {
      dispatch({ type: UPDATE_LOCKER_RESERVED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// open Locker
export const openLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/unlock', data)
    .then((res) => {
      dispatch({ type: OPEN_LOCKER, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

// get all inbox
export const getAllInbox = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getAllInbox', data)
    .then((res) => {
      dispatch({ type: GET_INBOX, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get total unread
export const getUnreadInbox = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/getUnread', data)
    .then((res) => {
      dispatch({ type: GET_UNREAD, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// update inbox read
export const updateInbox = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/dashboard/updateInbox', data)
    .then((res) => {
      dispatch({ type: READ_MESSAGE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get service price
export const getFabricPrice = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/getFabricPrice', data)
    .then((res) => {
      dispatch({ type: GET_SERVICE_PRICE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
  };
};

export const sendSupport = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/sendSupport', data)
    .then((res) => {
      dispatch({ type: SEND_SUPPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const resetPassword = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/customer/resetpassword', data)
    .then((res) => {
      dispatch({ type: RESET_PASSWORD, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const cancelOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/cancel', data)
    .then((res) => {
      dispatch({ type: CANCEL_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const completeOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/updateComplete', data)
    .then((res) => {
      dispatch({ type: COMPLETE_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const logoutUser = () => {
  return {
    type: LOG_OUT,
  };
};

export const saveOperatorId = (id) => {
  return {
    type: SAVE_OPERATORID,
    payload: id,
  };
};

export const resendOtp = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/auth/resendOtp', data)
    .then((res) => {
      dispatch({ type: RESEND_OTP, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getLocationList = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .get('/api/locker/getLocation', data)
    .then((res) => {
      dispatch({ type: GET_LOCATION, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const checkCode = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/checkDiscountCode', data)
    .then((res) => {
      dispatch({ type: CHECK_USER_CODE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const openLockerNew = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/unlock/trial', data)
    .then((res) => {
      dispatch({ type: NEW_LOCKER_UNLOCK, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

export const getAllLockerNew = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/available/getAll', data)
    .then((res) => {
      dispatch({ type: NEW_LOCKER_GETALL, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
};

export const syncLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/syncLocker', data)
    .then((res) => {
      dispatch({ type: SYNC_LOCKER, payload: res.data });
      dispatch({ type: IS_LOADED });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
      dispatch({ type: IS_LOADED });
    });
}
