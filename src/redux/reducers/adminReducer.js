import {
  IS_LOADING,
  IS_LOADED,
  SHOW_ERROR,
  CLEAR_ERROR,
  ADMIN_LOGIN,
  ORDER_LIST,
  LOG_OUT,
  UPDATE_ORDER,
  CREATE_TASK,
  OPERATOR_LIST,
  GET_ENQUIRY,
  UPDATE_ENQUIRY,
  LOCKER_SUMMARY,
  ADMIN_GET_LOCKER,
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
  UPDATE_FABRIC_LIST,
  CREATE_FABRIC,
  GET_CATEGORY_LIST,
  CREATE_SERVICE_LIST,
  GET_ORDER_DETAILS,
  CREATE_CHARGES,
  GET_ORDERID,
  GET_CHARGES,
  OPEN_LOCKER_STATUS,
  RESET_LOCKER_STATUS,
  GET_RESCHEDULE,
  CREATE_RESCHEDULE,
  GET_MDR,
  CREATE_MDR,
  REMOVE_MDR,
  GET_ADMIN,
  CREATE_ADMIN,
  REMOVE_ADMIN,
  GET_PAYMENT_REPORT,
  GET_CATEGORY_REPORT,
  GET_ITEM_REPORT,
  GET_SALES_SUMMARY_REPORT,
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

const initState = {
  adminToken: localStorage.getItem('adminToken'),
  isLoading: false,
  error: null,
  admin: null,
  isAuthenticated: false,
  operator: [],
  order: [],
  serviceList: [],
  authProgress: 'landing',
  token: localStorage.getItem('sl-admin'),
  overview: [],
  location: [],
  lockerDetails: null,
  lockerDetailsSummary: null,
  lockerSummary: [],
  locationList: [],
  operatorList: [],
  paymentList: [],
  categoryList: [],
  MDRList: [],
  itemList: [],
  SMSList: [],
  salesSummaryList: [],
  refundList: [],
  codeList: [],
  discountAmount: 0,
  allLockerByLocation: [],
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case IS_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        message: null,
        error: null,
        lockerDetails: null,
        lockerDetailsSummary: null,
        // allLockerByLocation: [],
      };
    case ADMIN_LOGIN:
      localStorage.setItem('adminToken', action.payload.adminToken);
      return {
        ...state,
        adminToken: action.payload.adminToken,
      };
    case VERIFY_TOKEN:
      let dLocation = [];
      const checkLocation = action.payload.data.roles;
      for (let a = 0; a < checkLocation.length; a++) {
        if (!dLocation.includes(checkLocation[a].location)) {
          dLocation.push(checkLocation[a].location);
        }
      }
      return {
        ...state,
        admin: action.payload.data,
        location: dLocation,
      };
    case ORDER_LIST:
      return {
        ...state,
        order: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        order: state.order.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, ...action.payload };
          } else {
            return data;
          }
        }),
      };
    case OPERATOR_LIST:
      // console.log(action.payload.data)
      return {
        ...state,
        operator: action.payload.data,
      };
    case CREATE_TASK:
      return {
        ...state,
      };
    case LOG_OUT:
      return {
        isAuthenticated: false,
        operator: null,
        token: null,
        admin: null,
      };
    case GET_ENQUIRY:
      return {
        ...state,
        enquiry: action.payload,
      };
    case UPDATE_ENQUIRY:
      return {
        ...state,
        enquiry: state.enquiry.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, ...action.payload };
          } else {
            return data;
          }
        }),
      };
    case ADMIN_UPDATE_LOCKER:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case GET_LOCKER_BY_LOCATION:
      return {
        ...state,
        lockerByLocation: action.payload,
      };
    case GET_ALL_LOCKER_BY_LOCATION:
      // console.log(action.payload);
      return {
        ...state,
        allLockerByLocation: action.payload.data,
        error: action.payload.error,
      };
    case ADMIN_GET_LOCKER:
      return {
        ...state,
        lockerSummary: action.payload,
      };
    case UPDATE_PRICING_STRATEGY:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case LOCKER_DETAILS:
      return {
        ...state,
        lockerDetails: action.payload.lockerDetails,
        lockerDetailsSummary: action.payload.lockerDetailsSummary,
      };
    case LOCKER_SUMMARY:
      return {
        ...state,
        lockerSummary: action.payload,
      };
    case GET_PERFORMANCE:
      return {
        ...state,
        userReport: action.payload,
      };
    case GET_OVERVIEW:
      return {
        ...state,
        overview: action.payload,
      };
    case GET_SERVICE_RANK:
      return {
        ...state,
        serviceRank: action.payload,
      };
    case GET_SERVICE_LIST:
      return {
        ...state,
        serviceList: action.payload.fabricData,
      };
    case GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload.foundOrder,
        discountAmount: action.payload.discountAmount,
      };
    case CREATE_SERVICE_LIST:
      return {
        ...state,
        message: action.payload,
      };
    case UPDATE_SERVICE_LIST:
      return {
        ...state,
        serviceList: state.serviceList.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data, ...action.payload };
          } else {
            return data;
          }
        }),
      };
    case GET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case GET_OPERATOR_LIST:
      // console.log('check', action.payload)
      return {
        ...state,
        operatorList: action.payload.data,
      };
    case UPDATE_OPERATOR_LIST:
      return {
        ...state,
      };
    case CREATE_OPERATOR:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case UPDATE_FABRIC_LIST:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case DUPLICATE_PRICING_STRATEGY:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case CREATE_FABRIC:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case CREATE_CHARGES:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case GET_ORDERID:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
        orderList: action.payload,
      };
    case GET_CHARGEORDER:
      return {
        ...state,
        error: action.payload.error,
        orderList: action.payload,
      };
    case GET_CHARGES:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
        chargesList: action.payload,
      };
    case RESET_LOCKER_STATUS:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case OPEN_LOCKER_STATUS:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case GET_RESCHEDULE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
        rescheduleList: action.payload,
      };
    case CREATE_RESCHEDULE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case GET_MDR:
      return {
        ...state,
        error: action.payload.error,
        MDRList: action.payload.MDRList,
      };
    case CREATE_MDR:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case REMOVE_MDR:
      return {
        ...state,
        MDRList: state.MDRList.map((data) => {
          if (data.id === action.payload.id) {
            return { ...data };
          } else {
            return data;
          }
        }),
      };
    case GET_ADMIN:
      return {
        ...state,
        error: action.payload.error,
        AdminList: action.payload.AdminList,
      };
    case GET_SMS:
      return {
        ...state,
        error: action.payload.error,
        SMSList: action.payload.data,
      };
    case CREATE_ADMIN:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case REMOVE_ADMIN:
      return {
        ...state,
        AdminList: state.AdminList.map((data) => {
          if (data.id === action.payload.data.id) {
            return { ...data, status: action.payload.data.status };
          } else {
            return data;
          }
        }),
      };
    case GET_PAYMENT_REPORT:
      return {
        ...state,
        paymentList: action.payload.paymentList,
        paymentType: action.payload.paymentType,
      };
    case GET_CATEGORY_REPORT:
      return {
        ...state,
        categoryList: action.payload.categoryList,
        categoryType: action.payload.categoryType,
        locationType: action.payload.locationType,
      };
    case GET_ITEM_REPORT:
      return {
        ...state,
        itemList: action.payload.itemList,
        itemType: action.payload.itemType,
        locationType: action.payload.locationType,
      };
    case GET_SALES_SUMMARY_REPORT:
      return {
        ...state,
        salesSummaryList: action.payload.salesSummaryList,
      };

    case GET_LOCATION_LIST:
      return {
        ...state,
        locationList: action.payload.locationList,
      };
    case GET_REFUND_REPORT:
      return {
        ...state,
        refundList: action.payload.refundList,
      };
    case GET_CODE:
      return {
        ...state,
        codeList: action.payload.codeList,
      };
    case CREATE_CODE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case UPDATE_CODE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case DELETE_CODE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default adminReducer;
