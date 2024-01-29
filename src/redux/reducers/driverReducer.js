import {
  IS_LOADING,
  IS_LOADED,
  SHOW_ERROR,
  CLEAR_ERROR,
  DRIVER_LOGIN,
  DRIVER_TASK,
  DRIVER_HISTORY,
  LOG_OUT,
  UPDATE_DELIVERY,
  UPDATE_PICK_UP,
} from '../types';

const initState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  task: [],
  operator: null,
  authProgress: 'landing',
  token: localStorage.getItem('sl-driver'),
};

const driverReducer = (state = initState, action) => {
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
        error: null,
      };
    case DRIVER_LOGIN:
      localStorage.setItem('sl-driver', action.payload.data.token);
      // console.log("checkoperat", action.payload.data)
      return {
        ...state,
        operator: action.payload.data.operator,
        type: 'driver',
        token: action.payload.data.token,
      };
    case DRIVER_TASK:
      // console.log("checktask", action.payload)
      return {
        ...state,
        task: action.payload.task,
      };
    case UPDATE_PICK_UP:
      console.log('checkpick', action.payload);
      const pickupId = action.payload.taskId;
      return {
        ...state,
        task: state.task.filter((item) => item.id !== pickupId),
      };
    case UPDATE_DELIVERY:
      console.log('check delivery', action.payload);
      const deliveryId = action.payload.taskId;
      return {
        ...state,
        task: state.task.filter((item) => item.id !== deliveryId),
      };
    case DRIVER_HISTORY:
      console.log('checktask', action.payload);
      return {
        ...state,
        pastTask: action.payload.pastTask,
      };
    case LOG_OUT:
      return {
        isAuthenticated: false,
        operator: null,
        token: null,
      };
    default:
      return state;
  }
};

export default driverReducer;
