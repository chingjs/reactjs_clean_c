import {
  IS_LOADING,
  SHOW_ERROR,
  CLEAR_ERROR,
  ADMIN_LOGIN,
  ORDER_LIST,
  LOG_OUT,
  UPDATE_ORDER,
  ADMIN_GET_LOCKER,
  OPERATOR_LIST,
  GET_ENQUIRY,
  UPDATE_ENQUIRY,
  LOCKER_SUMMARY,
  GET_PERFORMANCE,
  GET_OVERVIEW,
  GET_SERVICE_RANK,
  GET_SERVICE_LIST,
  UPDATE_SERVICE_LIST,
  GET_OPERATOR_LIST,
  UPDATE_OPERATOR_LIST,
  CREATE_OPERATOR,
  LOCKER_DETAILS,
  GET_LOCKER_BY_LOCATION,
  GET_ALL_LOCKER_BY_LOCATION,
  UPDATE_LOCKER_BOOKING,
  UPDATE_FABRIC_LIST,
  CREATE_FABRIC,
  GET_CATEGORY_LIST,
  GET_ORDER_DETAILS,
  CREATE_CHARGES,
  GET_ORDERID,
  GET_CHARGES,
  RESET_LOCKER_STATUS,
  OPEN_LOCKER_STATUS,
  GET_RESCHEDULE,
  CREATE_RESCHEDULE,
  GET_MDR,
  CREATE_MDR,
  REMOVE_MDR,
  GET_PAYMENT_REPORT,
  GET_CATEGORY_REPORT,
  GET_ITEM_REPORT,
  GET_SALES_SUMMARY_REPORT,
  GET_ADMIN,
  CREATE_ADMIN,
  REMOVE_ADMIN,
  VERIFY_TOKEN,
  GET_CHARGEORDER,
  GET_LOCATION_LIST,
  ADMIN_UPDATE_LOCKER,
  UPDATE_PRICING_STRATEGY,
  DUPLICATE_PRICING_STRATEGY,
  GET_SMS,
  GET_REFUND_REPORT,
  GET_CODE,
  CREATE_CODE,
  UPDATE_CODE,
  DELETE_CODE,
} from '../types';
import axios from 'axios';

// verify admin token
export const verifyToken = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/verifyToken', data)
    .then((res) => {
      dispatch({ type: VERIFY_TOKEN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response });
    });
};

// login admin
export const loginAdmin = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/login', data)
    .then((res) => {
      dispatch({ type: ADMIN_LOGIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get order details
export const getOrderDetails = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getOrderDetails', data)
    .then((res) => {
      dispatch({ type: GET_ORDER_DETAILS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get all order
export const getAllOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getAll', data)
    .then((res) => {
      dispatch({ type: ORDER_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// update pick up order detail
export const updatePickUpOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/details/updatePickUpOrder', data)
    .then((res) => {
      dispatch({ type: UPDATE_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// update delivery detail
export const updateDeliveryOrder = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/details/updateDeliveryOrder', data)
    .then((res) => {
      dispatch({ type: UPDATE_ORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get all available operator
export const getAllOperator = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/operator/getAll',data)
    .then((res) => {
      dispatch({ type: OPERATOR_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get all operator
export const getOperatorList = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/operator/getAll',data)
    .then((res) => {
      dispatch({ type: GET_OPERATOR_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get latest Locker slot status and update to database
export const getLockerByLocation = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/getEmptyByLocation', data)
    .then((res) => {
      dispatch({ type: GET_LOCKER_BY_LOCATION, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get latest Locker slot status and update to database
export const getAllLockerByLocation = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/checkalllocker', data)
    .then((res) => {
      dispatch({ type: GET_ALL_LOCKER_BY_LOCATION, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const openLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/unlock', data)
    .then((res) => {
      dispatch({ type: OPEN_LOCKER_STATUS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const resetLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/resetLocker', data)
    .then((res) => {
      dispatch({ type: RESET_LOCKER_STATUS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get all Locker
export const getAllLocker = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/getAll', data)
    .then((res) => {
      dispatch({ type: ADMIN_GET_LOCKER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// update pricing
export const updatePricingData = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/updatePricingStrategy', data)
    .then((res) => {
      dispatch({ type: UPDATE_PRICING_STRATEGY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// duplicate pricing
export const duplicatePricingData = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/duplicateList', data)
    .then((res) => {
      dispatch({ type: DUPLICATE_PRICING_STRATEGY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get all Locker
export const updateLockerStatus = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/update', data)
    .then((res) => {
      dispatch({ type: ADMIN_UPDATE_LOCKER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get Locker summary
export const getLockerSummary = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .get('/api/locker/lockerReport')
    .then((res) => {
      dispatch({ type: LOCKER_SUMMARY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get Locker details by id
export const getDetailsByLockerID = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/details/getAll', data)
    .then((res) => {
      dispatch({ type: LOCKER_DETAILS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// update locker reserved true
export const updateBooking = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/locker/updateBooking', data)
    .then((res) => {
      dispatch({ type: UPDATE_LOCKER_BOOKING, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get user performance
export const getUserReport = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .get('/api/admin/userReport')
    .then((res) => {
      dispatch({ type: GET_PERFORMANCE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get all enquiry
export const getAllEnquiry = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .get('/api/admin/enquiry/getAll')
    .then((res) => {
      dispatch({ type: GET_ENQUIRY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// update 1 enquiry
export const updateEnquiry = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/enquiry/edit', data)
    .then((res) => {
      dispatch({ type: UPDATE_ENQUIRY, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
// get today sales
export const getOverview = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/overview', data)
    .then((res) => {
      dispatch({ type: GET_OVERVIEW, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

// get service type rank
export const getServiceRank = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/service/sales', data)
    .then((res) => {
      dispatch({ type: GET_SERVICE_RANK, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  get service list
export const getAllService = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/getAll', data)
    .then((res) => {
      dispatch({ type: GET_SERVICE_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getAllPayment = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/payment/getAll', data)
    .then((res) => {
      dispatch({ type: GET_PAYMENT_REPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getAllItem = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/item/getAll', data)
    .then((res) => {
      dispatch({ type: GET_ITEM_REPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getAllCategory = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/category/getAll', data)
    .then((res) => {
      dispatch({ type: GET_CATEGORY_REPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getAllSalesSummary = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/sales/getAll', data)
    .then((res) => {
      dispatch({ type: GET_SALES_SUMMARY_REPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response });
    });
};
//  update operator list
export const updateService = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/service/update', data)
    .then((res) => {
      dispatch({ type: UPDATE_SERVICE_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getCategory = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .get('/api/service/getAll', data)
    .then((res) => {
      dispatch({ type: GET_CATEGORY_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  update fabric list
export const updateFabric = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/update', data)
    .then((res) => {
      dispatch({ type: UPDATE_FABRIC_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  update operator list
export const updateOperator = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/operator/edit', data)
    .then((res) => {
      dispatch({ type: UPDATE_OPERATOR_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
//  create operator
export const createOperator = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/operator/create', data)
    .then((res) => {
      dispatch({ type: CREATE_OPERATOR, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
//  create fabric
export const createFabric = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/fabric/create', data)
    .then((res) => {
      dispatch({ type: CREATE_FABRIC, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
//  create charges
export const createCharges = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/charges', data)
    .then((res) => {
      dispatch({ type: CREATE_CHARGES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
//  get orderID
export const getOrderID = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getList', data)
    .then((res) => {
      dispatch({ type: GET_ORDERID, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  get charges order ID
export const getChargesOrderID = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getChargesOrderList', data)
    .then((res) => {
      dispatch({ type: GET_CHARGEORDER, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  get charges
export const getCharges = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getCharges', data)
    .then((res) => {
      dispatch({ type: GET_CHARGES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getReschedule = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/getReschedule', data)
    .then((res) => {
      dispatch({ type: GET_RESCHEDULE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
//  create reschedule
export const createReschedule = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/order/reschedule', data)
    .then((res) => {
      dispatch({ type: CREATE_RESCHEDULE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getMDR = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/service/getMDR', data)
    .then((res) => {
      dispatch({ type: GET_MDR, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  create MDR
export const createMDR = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/service/createMDR', data)
    .then((res) => {
      dispatch({ type: CREATE_MDR, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const removeMDR = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/service/removeMDR', data)
    .then((res) => {
      dispatch({ type: REMOVE_MDR, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getAdmin = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/getAdminUser', data)
    .then((res) => {
      dispatch({ type: GET_ADMIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};
export const getSMS = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/misc/getSMS', data)
    .then((res) => {
      dispatch({ type: GET_SMS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

//  create MDR
export const createAdmin = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/createAdminUser', data)
    .then((res) => {
      dispatch({ type: CREATE_ADMIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const removeAdmin = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/removeAdminUser', data)
    .then((res) => {
      dispatch({ type: REMOVE_ADMIN, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getLocationList = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/misc/getLocationList', data)
    .then((res) => {
      dispatch({ type: GET_LOCATION_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getAllRefund = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/refund/getAll', data)
    .then((res) => {
      dispatch({ type: GET_REFUND_REPORT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const getAllCode = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/code/getAll', data)
    .then((res) => {
      dispatch({ type: GET_CODE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const createCode = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/code/create', data)
    .then((res) => {
      dispatch({ type: CREATE_CODE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const editCode = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/code/edit', data)
    .then((res) => {
      dispatch({ type: UPDATE_CODE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ERROR, payload: err.response.data.error });
    });
};

export const deleteCode = (data) => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: IS_LOADING });
  axios
    .post('/api/admin/code/delete', data)
    .then((res) => {
      dispatch({ type: DELETE_CODE, payload: res.data });
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
