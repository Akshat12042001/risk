import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NAVIGATION} from '../../constants';
import { CustomTab } from '../../components/molecules';
import { HomeScreen, BookingsScreen } from '../../screens/tabs';

const BottomTabs = createBottomTabNavigator();

const TABS = [
  {
    name: NAVIGATION.TABS.HOME_SCREEN,
    component: HomeScreen,
    title: 'TABS.HOME',
  },
  {
    name: NAVIGATION.TABS.BOOKINGS_SCREEN,
    component: BookingsScreen,
    title: 'TABS.BOOKINGS',
  },
];

export default () => {

  return (
    <BottomTabs.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        animation: 'none',
        lazy: false,
      }}
      tabBar={props => (
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
          }}>
          <CustomTab {...props} />
        </View>
      )}>
      {TABS.map((item, index) => {
        return (
          <BottomTabs.Screen
            key={`${item.name}${index}`}
            name={item.name}
            component={item.component}
            initialParams={{
              title: item.title,
            }}
          />
        );
      })}
    </BottomTabs.Navigator>
  );
};
