import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  data: null,
  durationOptionsByServiceId: {},
};

const ensureCartShape = state => {
  if (!state.durationOptionsByServiceId) {
    state.durationOptionsByServiceId = {};
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setCart: (state, action) => {
      ensureCartShape(state);
      state.data = action.payload || null;
    },
    setDurationOptions: (state, action) => {
      ensureCartShape(state);
      const {serviceId, durations} = action.payload || {};
      if (!serviceId) {
        return;
      }
      state.durationOptionsByServiceId[String(serviceId)] = Array.isArray(
        durations,
      )
        ? durations
        : [];
    },
    clearCart: state => {
      state.data = null;
      state.durationOptionsByServiceId = {};
    },
  },
});

export const {setCart, setDurationOptions, clearCart} = cartSlice.actions;

export const selectCartData = state => state.cart?.data || null;
export const selectCartItems = state => state.cart?.data?.items || [];
export const selectCartCount = state =>
  state.cart?.data?.serviceCount ?? state.cart?.data?.items?.length ?? 0;
export const selectCartItemByServiceId = (state, serviceId) =>
  state.cart?.data?.items?.find(
    item => String(item.serviceId) === String(serviceId),
  ) || null;
export const selectDurationOptionsByServiceId = (state, serviceId) =>
  state.cart?.durationOptionsByServiceId?.[serviceId] || [];

export default cartSlice.reducer;
