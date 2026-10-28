import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import {baseApi} from './api/baseApi';
import './api/homeApi';

export default combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
