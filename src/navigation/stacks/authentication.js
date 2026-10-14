import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import {WelcomeScreen, OtpScreen, ReferralCodeScreen, UserDetailScreen} from '../../screens/authentication';
import config from '../config';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen
        name={NAVIGATION.AUTH.WELCOME_SCREEN}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={NAVIGATION.AUTH.OTP_SCREEN}
        component={OtpScreen}
      />
      <Stack.Screen
        name={NAVIGATION.AUTH.REFERRAL_CODE_SCREEN}
        component={ReferralCodeScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={NAVIGATION.AUTH.USER_DETAIL_SCREEN}
        component={UserDetailScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
