import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import {
  ProfileScreen,
  UserDetailScreen,
  MyAddressesScreen,
  ConfirmLocationScreen,
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
    </Stack.Navigator>
  );
};
