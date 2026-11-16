import {makeCreateBookingRequest} from '../../api/bookings';
import {
  makeAddCartItemRequest,
  makeGetCartRequest,
  makeRemoveCartItemRequest,
  makeUpdateCartBookingRequest,
  makeUpdateCartItemRequest,
} from '../../api/cart';
import {
  makeApplyCouponRequest,
  makeRemoveCouponRequest,
} from '../../api/coupons';
import {makeGetServiceRequest} from '../../api/services';
import {
  clearCart,
  selectCartItemByServiceId,
  selectDurationOptionsByServiceId,
  setCart,
  setDurationOptions,
} from './cart.reducer';

const toId = value => {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    if (value.$oid) {
      return String(value.$oid);
    }
    if (value._id) {
      return toId(value._id);
    }
    if (typeof value.toString === 'function') {
      const asString = value.toString();
      if (asString && asString !== '[object Object]') {
        return asString;
      }
    }
  }
  return String(value);
};

const normalizeCart = cart => {
  if (!cart) {
    return null;
  }

  return {
    ...cart,
    items: Array.isArray(cart.items)
      ? cart.items.map(item => ({
          ...item,
          id: toId(item.id || item._id),
          serviceId: toId(item.serviceId || item.service),
          durationId:
            item.durationId == null ? item.durationId : String(item.durationId),
        }))
      : [],
    booking: cart.booking
      ? {
          ...cart.booking,
          location: cart.booking.location
            ? {
                ...cart.booking.location,
                id: toId(cart.booking.location.id || cart.booking.location._id),
              }
            : null,
          slot: cart.booking.slot
            ? {
                ...cart.booking.slot,
                id: toId(cart.booking.slot.id || cart.booking.slot._id),
              }
            : null,
        }
      : cart.booking,
  };
};

const extractCart = response =>
  normalizeCart(response?.data?.cart || null);

export const fetchCart = () => async dispatch => {
  const response = await makeGetCartRequest();
  const cart = extractCart(response);
  dispatch(setCart(cart));
  return cart;
};

export const addCartItem =
  ({serviceId, durationId, durations}) =>
  async dispatch => {
    const response = await makeAddCartItemRequest({
      serviceId: toId(serviceId),
      durationId: String(durationId),
    });
    const cart = extractCart(response);
    dispatch(setCart(cart));
    if (durations) {
      dispatch(
        setDurationOptions({
          serviceId: toId(serviceId),
          durations,
        }),
      );
    }
    return cart;
  };

export const removeCartItemByServiceId =
  serviceId => async (dispatch, getState) => {
    const item = selectCartItemByServiceId(getState(), toId(serviceId));
    if (!item?.id) {
      return null;
    }
    const response = await makeRemoveCartItemRequest(toId(item.id));
    const cart = extractCart(response);
    dispatch(setCart(cart));
    return cart;
  };

export const removeCartItemById = itemId => async dispatch => {
  const response = await makeRemoveCartItemRequest(toId(itemId));
  const cart = extractCart(response);
  dispatch(setCart(cart));
  return cart;
};

const resolveDurationOptions = async (dispatch, getState, serviceId) => {
  const normalizedServiceId = toId(serviceId);
  let options = selectDurationOptionsByServiceId(
    getState(),
    normalizedServiceId,
  );
  if (options.length) {
    return options;
  }

  const response = await makeGetServiceRequest(normalizedServiceId);
  const service = response?.data?.service ?? response?.data ?? response;
  options = Array.isArray(service?.durations) ? service.durations : [];
  dispatch(
    setDurationOptions({
      serviceId: normalizedServiceId,
      durations: options,
    }),
  );
  return options;
};

export const stepCartItemDuration =
  ({item, direction}) =>
  async (dispatch, getState) => {
    const itemId = toId(item?.id || item?._id);
    const serviceId = toId(item?.serviceId || item?.service);
    const currentDurationId =
      item?.durationId == null ? '' : String(item.durationId);
    const currentMinutes = Number(item?.minutes);

    if (!itemId || !serviceId) {
      throw new Error('Cart item is missing ids');
    }

    const options = [
      ...(await resolveDurationOptions(dispatch, getState, serviceId)),
    ].sort((a, b) => Number(a.minutes) - Number(b.minutes));

    // No lower duration available → remove item from cart
    if (direction === 'decrement' && !options.length) {
      return dispatch(removeCartItemById(itemId));
    }

    if (!options.length) {
      throw new Error('No durations available for this service');
    }

    const currentIndex = options.findIndex(
      option =>
        String(option.id) === currentDurationId ||
        Number(option.minutes) === currentMinutes,
    );

    if (direction === 'decrement' && currentIndex <= 0) {
      return dispatch(removeCartItemById(itemId));
    }

    if (direction === 'increment' && currentIndex < 0) {
      // Unknown duration: jump to the shortest option
      const next = options[0];
      const response = await makeUpdateCartItemRequest(itemId, {
        durationId: String(next.id),
      });
      const cart = extractCart(response);
      dispatch(setCart(cart));
      return cart;
    }

    if (direction === 'increment' && currentIndex >= options.length - 1) {
      return getState().cart?.data || null;
    }

    const nextIndex =
      direction === 'increment' ? currentIndex + 1 : currentIndex - 1;
    const next = options[nextIndex];
    if (!next || String(next.id) === currentDurationId) {
      return getState().cart?.data || null;
    }

    const response = await makeUpdateCartItemRequest(itemId, {
      durationId: String(next.id),
    });
    const cart = extractCart(response);
    dispatch(setCart(cart));
    return cart;
  };

export const updateCartBooking = payload => async dispatch => {
  const body = {};
  if (payload?.slotDate) {
    body.slotDate = payload.slotDate;
  }
  if (payload?.slotId) {
    body.slotId = toId(payload.slotId);
  }
  if (payload?.addressId) {
    body.addressId = toId(payload.addressId);
  }

  const response = await makeUpdateCartBookingRequest(body);
  const cart = extractCart(response);
  dispatch(setCart(cart));
  return cart;
};

export const applyCoupon = code => async dispatch => {
  const response = await makeApplyCouponRequest(code);
  const cart = extractCart(response);
  dispatch(setCart(cart));
  return cart;
};

export const removeCoupon = () => async dispatch => {
  const response = await makeRemoveCouponRequest();
  const cart = extractCart(response);
  dispatch(setCart(cart));
  return cart;
};

export const placeBooking = () => async dispatch => {
  const response = await makeCreateBookingRequest();
  const booking = response?.data?.booking || null;
  dispatch(clearCart());
  return booking;
};
