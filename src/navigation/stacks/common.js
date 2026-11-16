import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import {
  ProfileScreen,
  UserDetailScreen,
  MyAddressesScreen,
  ConfirmLocationScreen,
  AddAddressDetailScreen,
  ServiceDetailScreen,
  CartScreen,
  CouponScreen,
  BookingDetailScreen,
} from '../../screens/common';
import config from '../config';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config} detachInactiveScreens={false}>
      <Stack.Screen
        name={NAVIGATION.COMMON.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.USER_DETAIL_SCREEN}
        component={UserDetailScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.MY_ADDRESSES_SCREEN}
        component={MyAddressesScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN}
        component={ConfirmLocationScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.ADD_ADDRESS_DETAIL_SCREEN}
        component={AddAddressDetailScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.SERVICE_DETAIL_SCREEN}
        component={ServiceDetailScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.CART_SCREEN}
        component={CartScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.COUPON_SCREEN}
        component={CouponScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.BOOKING_DETAIL_SCREEN}
        component={BookingDetailScreen}
      />
    </Stack.Navigator>
  );
};
