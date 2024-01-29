import {
  IS_LOADING,
  SHOW_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  DRIVER_LOGIN,
  DRIVER_HISTORY,
  DRIVER_TASK,
  UPDATE_DELIVERY,
  UPDATE_PICK_UP,
} from '../types';
import  axios from 'axios';

// login driver
export const loginDriver = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/operator/login', data)
    .then((res) => {
      dispatch({ type: DRIVER_LOGIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get current task
export const getCurrentTask = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/operator/viewCurrentTask', data)
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: DRIVER_TASK, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get past history
export const getPastTask = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/operator/viewPastTask', data)
    .then((res) => {
      dispatch({ type: DRIVER_HISTORY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// update pick up time
export const updatePickUp = (data) => (dispatch) => {
  console.log("pickup data", data)
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/details/updatePickUp', data)
    .then((res) => {
      dispatch({ type: UPDATE_PICK_UP, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// update delivery up time
export const updateDelivery = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  // console.log("data",data)
  axios
    .post('/api/order/details/updateDelivery', data)
    .then((res) => {
      dispatch({ type: UPDATE_DELIVERY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
