import React, {useCallback, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticationStack from './stacks/authentication';
import CommonStack from './stacks/common';
import BottomTabs from './bottomTabs';
import config from './config';
import {NAVIGATION} from '../constants';
import {NavigationService} from '../services';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  console.log(isLoggedIn);

  const handleNavigationRef = useCallback(ref => {
    NavigationService.setNavigatorRef(ref);
  }, []);

  return (
    <NavigationContainer ref={handleNavigationRef}>
      <Stack.Navigator screenOptions={config}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={NAVIGATION.STACKS.TABS}
              component={BottomTabs}
            />
            <Stack.Screen
              name={NAVIGATION.STACKS.COMMON}
              component={CommonStack}
            />
          </>
        ) : (
          <Stack.Screen
            name={NAVIGATION.STACKS.AUTH}
            component={AuthenticationStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
