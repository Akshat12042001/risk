import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';

const TAB_ICONS = {
  [NAVIGATION.TABS.HOME_SCREEN]: 'home',
  [NAVIGATION.TABS.BOOKINGS_SCREEN]: 'assignment',
};

const CustomTabBar = ({state, navigation}) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const onPress = useCallback(
    (route, index) => {
      const isFocused = state?.index === index;
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [state?.index, navigation],
  );

  const onLongPress = useCallback(
    route => {
      navigation.emit({
        target: route.key,
        type: 'tabLongPress',
      });
    },
    [navigation],
  );

  return (
    <View
      style={[
        styles.container,
        {paddingBottom: Math.max(insets.bottom, 10)},
      ]}>
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const isFocused = state?.index === index;
          const color = isFocused ? COLORS.TAB_ACTIVE : COLORS.TAB_INACTIVE;
          const iconName = TAB_ICONS[route.name] || 'circle';
          const titleKey = route.params?.title;

          return (
            <Pressable
              key={route.name}
              accessibilityRole="button"
              accessibilityState={{selected: isFocused}}
              accessibilityLabel={titleKey ? t(titleKey) : route.name}
              style={styles.tabHit}
              onPress={() => onPress(route, index)}
              onLongPress={() => onLongPress(route)}>
              <View
                style={[styles.tabPill, isFocused && styles.tabPillActive]}>
                <Icon name={iconName} size={22} color={color} />
                <StyledText
                  color={color}
                  size={14}
                  textStyle={styles.tabLabel}>
                  {titleKey ? t(titleKey) : route.name}
                </StyledText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
