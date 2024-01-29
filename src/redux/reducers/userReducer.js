import {
  IS_LOADING,
  IS_LOADED,
  SHOW_ERROR,
  CLEAR_ERROR,
  USER_REGISTERED,
  USER_LOGIN,
  LOG_OUT,
  GET_INBOX,
  GET_UNREAD,
  READ_MESSAGE,
  GET_PROFILE,
  EDIT_PROFILE,
  ORDER_CREATE,
  GET_LOCKER,
  GET_PAST_ORDER,
  GET_CURRENT_ORDER,
  GET_COLLECT_ORDER,
  GET_PAYMENT_ORDER,
  GET_DEPOSIT_ORDER,
  MAKE_PAYMENT,
  GET_SERVICE_PRICE,
  RESET_PASSWORD,
  CANCEL_ORDER,
  RESEND_OTP,
  CLEAR_LOGIN_ERROR,
  COMPLETE_ORDER,
  CHECK_ONE_LOCKER,
  GET_EMPTY_LOCKER,
  UPDATE_LOCKER_RESERVED,
  GET_SMALL_LOCKER,
  GET_LOCATION,
  CHECK_USER_CODE,
  OPEN_LOCKER,
  SYNC_LOCKER,
} from '../types';

const initState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  cloth: null,
  order: null,
  paymentOrder: '',
  authProgress: 'landing',
  token: localStorage.getItem('sl-user'),
  operatorId: localStorage.getItem('operatorId'),
  discountData: '',
  success: null,
};

const userReducer = (state = initState, action) => {
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
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        user: null,
        message: null,
        error: null,
      };
    case USER_REGISTERED:
      // console.log(action.payload);
      return {
        ...state,
        message: action.payload.message,
      };
    case USER_LOGIN:
      localStorage.setItem('sl-user', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        type: 'user',
        token: action.payload.token,
      };

    case GET_INBOX:
      return {
        ...state,
        inbox: action.payload.inbox,
      };
    case READ_MESSAGE:
      return {
        ...state,
        inbox: action.payload.inbox,
      };
    case GET_UNREAD:
      return {
        ...state,
        unread: action.payload.unread,
      };
    case GET_PROFILE:
      // console.log('re',action.payload)
      return {
        ...state,
        user: action.payload.data,
        locationList: action.payload.locationList,
        isAuthenticated: true,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.payload.data,
        message: action.payload.message,
      };
    case ORDER_CREATE:
      //   localStorage.setItem('sl-user', action.payload.token);
      // console.log(action.payload)
      return {
        ...state,
        order: action.payload.order,
        url: action.payload.url,
        token: action.payload.token,
        code: action.payload.code,
      };
    case MAKE_PAYMENT:
      return {
        ...state,
        url: action.payload.url,
      };
    case GET_PAST_ORDER:
      return {
        ...state,
        pastOrder: action.payload.pastOrder,
      };
    case GET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload.currentOrder,
      };
    case GET_COLLECT_ORDER:
      return {
        ...state,
        collectOrder: action.payload.collectOrder,
      };
    case GET_PAYMENT_ORDER:
      return {
        ...state,
        paymentOrder: action.payload.paymentOrder,
      };
    case GET_DEPOSIT_ORDER:
      return {
        ...state,
        depositOrder: action.payload.depositOrder,
      };

    case GET_LOCKER:
      return {
        ...state,
      };
    case GET_EMPTY_LOCKER:
      return {
        locker: action.payload,
      };
    case GET_SMALL_LOCKER:
      return {
        ...state,
        small: action.payload,
      };
    case UPDATE_LOCKER_RESERVED:
      return {
        ...state,
      };
    case CHECK_ONE_LOCKER:
      return {
        ...state,
        oneLocker: action.payload.message,
        error: action.payload.error,
      };
    case GET_SERVICE_PRICE:
      return {
        ...state,
        servicePrice: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem('sl-token');
      return {
        isAuthenticated: false,
        user: null,
        address: null,
        type: null,
        order: null,
        token: null,
        inbox: null,
        unread: null,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        message: 'ok',
      };
    case CANCEL_ORDER:
      return {
        ...state,
        paymentOrder: state.paymentOrder.filter((data) => {
          if (data.id === action.payload.id) {
            return { ...data, ...action.payload };
          } else {
            return data;
          }
        }),
      };
    case COMPLETE_ORDER:
      return {
        ...state,
      };
    case RESEND_OTP:
      return {
        message: action.payload.message,
      };
    case GET_LOCATION:
      return {
        locationList: action.payload.data,
        state: action.payload.state,
        city: action.payload.city,
        name: action.payload.name,
      };
    case CHECK_USER_CODE:
      return {
        ...state,
        discountData: action.payload.discountData,
        error: action.payload.error,
      };
    case OPEN_LOCKER:
      return {
        ...state,
        success: action.payload.success,
        error: action.payload.error,
      };
    case SYNC_LOCKER:
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default userReducer;
