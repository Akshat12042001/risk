import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import cartReducer from './cart/cart.reducer';
import {baseApi} from './api/baseApi';
import './api/homeApi';

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
