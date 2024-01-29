import { combineReducers } from 'redux';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import driverReducer from './driverReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  userReducer,
  pageReducer,
  driverReducer,
  adminReducer,
});

export default rootReducer;
